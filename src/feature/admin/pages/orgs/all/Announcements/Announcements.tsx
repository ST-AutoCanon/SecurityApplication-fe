import { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  Bell,
  CalendarDays,
  Clock3,
  Megaphone,
  RefreshCw,
  X,
  Sparkles,
  Plus,
  Send,
  Pencil,
  Trash2,
  Image as ImageIcon,
  Loader2,
  Smile,
  Type,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Palette,
  ImagePlus,
  CheckCircle2,
  AlertCircle,
  Info,
  HelpCircle,
} from "lucide-react";

type BlockType = "text" | "image";

type MessageBlock = {
  id: string;
  type: BlockType;
  content?: string;
  url?: string;
  color?: string;
  backgroundColor?: string;
  fontSize?: number;
  fontWeight?: "normal" | "bold";
  fontStyle?: "normal" | "italic";
  textAlign?: "left" | "center" | "right";
  fontFamily?: string;
};

type Announcement = {
  id: number;
  title?: string;
  message?: string;
  description?: string;
  announcement?: string;
  priority?: string;
  created_at?: string;
  createdAt?: string;
  published_at?: string;
  publishedAt?: string;
  publish_date?: string;
  expires_at?: string;
  expiresAt?: string;
  expiry_date?: string;
  expiryDate?: string;
};

type AnnouncementForm = {
  title: string;
  message: string;
  priority: string;
  expiresAt: string;
};

type PopupType = "success" | "error" | "warning" | "info" | "confirm";

type PopupState = {
  open: boolean;
  type: PopupType;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
};

const API_URL = import.meta.env.VITE_BACKEND_URL;

const COMMON_EMOJIS = [
  "😀", "😃", "😄", "😁", "😆", "😂", "🤣", "😊", "😍", "🥰",
  "😘", "😉", "😎", "🤩", "🥳", "😢", "😭", "😡", "👍", "👏",
  "🙌", "🙏", "🤝", "❤️", "💙", "💜", "🔥", "⭐", "✨", "🎉",
  "🎊", "🎁", "🏆", "✅", "❌", "❗", "❓", "💯", "🔔", "📢",
];

const FONT_FAMILIES = [
  "Arial",
  "Georgia",
  "Times New Roman",
  "Verdana",
  "Tahoma",
  "Trebuchet MS",
  "Courier New",
];

const FONT_SIZES = [12, 13, 14, 15, 16, 18, 20, 22, 24, 28, 32];

const generateId = () => Math.random().toString(36).slice(2, 11);

const createTextBlock = (): MessageBlock => ({
  id: generateId(),
  type: "text",
  content: "",
  color: "#334155",
  backgroundColor: "transparent",
  fontSize: 14,
  fontWeight: "normal",
  fontStyle: "normal",
  textAlign: "left",
  fontFamily: "Arial",
});

const createImageBlock = (): MessageBlock => ({
  id: generateId(),
  type: "image",
  url: "",
});

const parseMessageBlocks = (message?: string): MessageBlock[] => {
  if (!message) return [createTextBlock()];

  try {
    const parsed = JSON.parse(message);

    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed.map((block: any) => ({
        id: block.id || generateId(),
        type: block.type === "image" ? "image" : "text",
        content: block.content ?? "",
        url: block.url ?? "",
        color: block.color ?? "#334155",
        backgroundColor: block.backgroundColor ?? "transparent",
        fontSize: Number(block.fontSize ?? 14),
        fontWeight: block.fontWeight === "bold" ? "bold" : "normal",
        fontStyle: block.fontStyle === "italic" ? "italic" : "normal",
        textAlign: ["left", "center", "right"].includes(block.textAlign)
          ? block.textAlign
          : "left",
        fontFamily: block.fontFamily || "Arial",
      }));
    }
  } catch {
    // Existing announcements may contain ordinary text.
  }

  return [
    {
      ...createTextBlock(),
      content: message,
    },
  ];
};

const getMessage = (announcement: Announcement) =>
  announcement.message ||
  announcement.description ||
  announcement.announcement ||
  "";

const getPublishedDate = (announcement: Announcement) =>
  announcement.published_at ||
  announcement.publishedAt ||
  announcement.publish_date ||
  announcement.created_at ||
  announcement.createdAt ||
  "";

const getExpiryDate = (announcement: Announcement) =>
  announcement.expires_at ||
  announcement.expiresAt ||
  announcement.expiry_date ||
  announcement.expiryDate ||
  "";

const formatDate = (value?: string) => {
  if (!value) return "--";

  const raw = String(value).trim();
  const dateOnly = raw.match(/^\d{4}-\d{2}-\d{2}/)?.[0];

  if (dateOnly) {
    const [year, month, day] = dateOnly.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    if (!Number.isNaN(date.getTime())) {
      return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    }
  }

  const date = new Date(raw);
  if (Number.isNaN(date.getTime())) return "--";

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getDateInputValue = (value?: string) => {
  if (!value) return "";
  const raw = String(value).trim();
  const match = raw.match(/^(\d{4}-\d{2}-\d{2})/);
  if (match) return match[1];

  const date = new Date(raw);
  if (Number.isNaN(date.getTime())) return "";

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getTodayInputValue = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};


const getPriorityStyles = (priority?: string) => {
  const value = (priority || "General").toLowerCase();
  if (value === "important") {
    return {
      accent: "bg-red-500",
      badge: "border-red-200 bg-red-50 text-red-600",
      icon: "bg-red-50 text-red-600",
    };
  }
  if (value === "urgent") {
    return {
      accent: "bg-orange-500",
      badge: "border-orange-200 bg-orange-50 text-orange-600",
      icon: "bg-orange-50 text-orange-600",
    };
  }
  if (value === "notice") {
    return {
      accent: "bg-amber-500",
      badge: "border-amber-200 bg-amber-50 text-amber-600",
      icon: "bg-amber-50 text-amber-600",
    };
  }
  return {
    accent: "bg-blue-500",
    badge: "border-blue-200 bg-blue-50 text-blue-600",
    icon: "bg-blue-50 text-blue-600",
  };
};

const PopupModal = ({
  popup,
  onClose,
}: {
  popup: PopupState;
  onClose: () => void;
}) => {
  if (!popup.open) return null;

  const isConfirm = popup.type === "confirm";
  const config = {
    success: { icon: CheckCircle2, bg: "bg-emerald-50", color: "text-emerald-600" },
    error: { icon: AlertCircle, bg: "bg-red-50", color: "text-red-600" },
    warning: { icon: AlertCircle, bg: "bg-amber-50", color: "text-amber-600" },
    info: { icon: Info, bg: "bg-blue-50", color: "text-blue-600" },
    confirm: { icon: HelpCircle, bg: "bg-red-50", color: "text-red-600" },
  }[popup.type];

  const Icon = config.icon;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-white/70 bg-white shadow-2xl">
        <div className="p-6 text-center">
          <div className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${config.bg} ${config.color}`}>
            <Icon size={23} />
          </div>
          <h3 className="mt-4 text-base font-semibold text-slate-900">{popup.title}</h3>
          <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-500">{popup.message}</p>
        </div>
        <div className="flex justify-center gap-2 border-t border-slate-100 bg-slate-50 px-5 py-4">
          {isConfirm && (
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100"
            >
              {popup.cancelText || "Cancel"}
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              const action = popup.onConfirm;
              onClose();
              action?.();
            }}
            className={`rounded-xl px-5 py-2.5 text-xs font-semibold text-white ${isConfirm ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"}`}
          >
            {isConfirm ? popup.confirmText || "Confirm" : "OK"}
          </button>
        </div>
      </div>
    </div>
  );
};

const uploadImageFile = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await axios.post(
    `${API_URL}/api/upload/image`,
    formData,
    {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    }
  );

  if (!response.data?.success || !response.data?.url) {
    throw new Error(response.data?.message || "Image upload failed");
  }

  return response.data.url;
};

const EmojiPicker = ({
  onSelect,
  onClose,
}: {
  onSelect: (emoji: string) => void;
  onClose: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="absolute left-0 top-full z-[80] mt-2 grid w-[280px] max-h-[220px] grid-cols-8 gap-1 overflow-y-auto rounded-xl border border-slate-200 bg-white p-2 shadow-2xl"
    >
      {COMMON_EMOJIS.map((emoji) => (
        <button
          key={emoji}
          type="button"
          onClick={() => {
            onSelect(emoji);
            onClose();
          }}
          className="rounded-md bg-transparent p-1 text-xl transition hover:bg-slate-100"
        >
          {emoji}
        </button>
      ))}
    </div>
  );
};

const TextBlockEditor = ({
  block,
  onUpdate,
}: {
  block: MessageBlock;
  onUpdate: (updates: Partial<MessageBlock>) => void;
}) => {
  const [showEmoji, setShowEmoji] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertEmoji = (emoji: string) => {
    const textarea = textareaRef.current;
    const current = block.content || "";

    if (!textarea) {
      onUpdate({ content: current + emoji });
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const next = current.slice(0, start) + emoji + current.slice(end);
    onUpdate({ content: next });

    requestAnimationFrame(() => {
      textarea.focus();
      const position = start + emoji.length;
      textarea.setSelectionRange(position, position);
    });
  };

  return (
    <div>
      <div className="relative mb-2 flex flex-wrap items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 p-2">
        <label className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-[10px] text-slate-500">
          <Palette size={13} />
          <span>Color</span>
          <input
            type="color"
            value={block.color || "#334155"}
            onChange={(e) => onUpdate({ color: e.target.value })}
            className="h-5 w-6 cursor-pointer border-0 bg-transparent p-0"
          />
        </label>

        <label className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-[10px] text-slate-500">
          <span>Bg</span>
          <input
            type="color"
            value={
              block.backgroundColor && block.backgroundColor !== "transparent"
                ? block.backgroundColor
                : "#ffffff"
            }
            onChange={(e) => onUpdate({ backgroundColor: e.target.value })}
            className="h-5 w-6 cursor-pointer border-0 bg-transparent p-0"
          />
          <button
            type="button"
            onClick={() => onUpdate({ backgroundColor: "transparent" })}
            className="text-[9px] text-slate-400 hover:text-slate-700"
          >
            Clear
          </button>
        </label>

        <label className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-[10px] text-slate-500">
          <Type size={13} />
          <select
            value={block.fontFamily || "Arial"}
            onChange={(e) => onUpdate({ fontFamily: e.target.value })}
            className="bg-transparent text-[10px] font-medium text-slate-700 outline-none"
          >
            {FONT_FAMILIES.map((font) => (
              <option key={font} value={font}>
                {font}
              </option>
            ))}
          </select>
        </label>

        <label className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-[10px] text-slate-500">
          <span>Size</span>
          <select
            value={block.fontSize || 14}
            onChange={(e) => onUpdate({ fontSize: Number(e.target.value) })}
            className="bg-transparent text-[10px] font-medium text-slate-700 outline-none"
          >
            {FONT_SIZES.map((size) => (
              <option key={size} value={size}>
                {size}px
              </option>
            ))}
          </select>
        </label>

        <button
          type="button"
          onClick={() =>
            onUpdate({
              fontWeight: block.fontWeight === "bold" ? "normal" : "bold",
            })
          }
          className={`flex h-7 w-7 items-center justify-center rounded-lg border ${
            block.fontWeight === "bold"
              ? "border-violet-300 bg-violet-50 text-violet-700"
              : "border-slate-200 bg-white text-slate-600"
          }`}
          title="Bold"
        >
          <Bold size={14} />
        </button>

        <button
          type="button"
          onClick={() =>
            onUpdate({
              fontStyle: block.fontStyle === "italic" ? "normal" : "italic",
            })
          }
          className={`flex h-7 w-7 items-center justify-center rounded-lg border ${
            block.fontStyle === "italic"
              ? "border-violet-300 bg-violet-50 text-violet-700"
              : "border-slate-200 bg-white text-slate-600"
          }`}
          title="Italic"
        >
          <Italic size={14} />
        </button>

        {([
          ["left", AlignLeft],
          ["center", AlignCenter],
          ["right", AlignRight],
        ] as const).map(([align, Icon]) => (
          <button
            key={align}
            type="button"
            onClick={() => onUpdate({ textAlign: align })}
            className={`flex h-7 w-7 items-center justify-center rounded-lg border ${
              (block.textAlign || "left") === align
                ? "border-violet-300 bg-violet-50 text-violet-700"
                : "border-slate-200 bg-white text-slate-600"
            }`}
            title={`Align ${align}`}
          >
            <Icon size={14} />
          </button>
        ))}

        <div className="relative">
          <button
            type="button"
            onClick={() => setShowEmoji((value) => !value)}
            className="flex h-7 items-center gap-1 rounded-lg border border-slate-200 bg-white px-2 text-[10px] text-slate-600"
          >
            <Smile size={13} /> Emoji
          </button>
          {showEmoji && (
            <EmojiPicker
              onSelect={insertEmoji}
              onClose={() => setShowEmoji(false)}
            />
          )}
        </div>
      </div>

      <textarea
        ref={textareaRef}
        value={block.content || ""}
        onChange={(e) => onUpdate({ content: e.target.value })}
        rows={5}
        placeholder="Write your announcement message..."
        style={{
          color: block.color || "#334155",
          backgroundColor:
            block.backgroundColor && block.backgroundColor !== "transparent"
              ? block.backgroundColor
              : "#ffffff",
          fontSize: block.fontSize || 14,
          fontWeight: block.fontWeight || "normal",
          fontStyle: block.fontStyle || "normal",
          textAlign: block.textAlign || "left",
          fontFamily: block.fontFamily || "Arial",
        }}
        className="w-full resize-y rounded-xl border border-slate-200 px-3 py-3 leading-6 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
      />
    </div>
  );
};

const ImageBlockEditor = ({
  block,
  onUpdate,
  onNotify,
}: {
  block: MessageBlock;
  onUpdate: (updates: Partial<MessageBlock>) => void;
  onNotify?: (type: PopupType, title: string, message: string) => void;
}) => {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);

  const handleFiles = async (files: FileList | File[]) => {
    const file = Array.from(files).find((item) =>
      item.type.startsWith("image/")
    );

    if (!file) {
      onNotify?.("warning", "Invalid Image", "Please select a PNG, JPG, GIF or WebP image.");
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      onNotify?.("warning", "Image Too Large", "Image must be under 8 MB.");
      return;
    }

    try {
      setUploading(true);
      const url = await uploadImageFile(file);
      onUpdate({ url });
    } catch (error: any) {
      console.error(error);
      onNotify?.("error", "Image Upload Failed", error?.message || "Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    const element = dropRef.current;
    if (!element) return;

    const onPaste = (event: ClipboardEvent) => {
      const items = event.clipboardData?.items;
      if (!items) return;

      for (const item of Array.from(items)) {
        if (item.type.startsWith("image/")) {
          event.preventDefault();
          const file = item.getAsFile();
          if (file) handleFiles([file]);
          break;
        }
      }
    };

    element.addEventListener("paste", onPaste as any);
    element.tabIndex = 0;
    return () => element.removeEventListener("paste", onPaste as any);
  }, []);

  if (block.url) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-3">
        <img
          src={block.url}
          alt="Announcement banner"
          className="max-h-[260px] w-full rounded-lg object-cover"
        />
        <div className="mt-2 flex justify-end">
          <button
            type="button"
            onClick={() => onUpdate({ url: "" })}
            className="inline-flex items-center gap-1 rounded-lg border border-red-100 bg-red-50 px-2.5 py-1.5 text-[10px] font-medium text-red-600 hover:bg-red-100"
          >
            <Trash2 size={12} /> Remove image
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        ref={dropRef}
        onDragOver={(event) => {
          event.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragOver(false);
          if (event.dataTransfer.files?.length) {
            handleFiles(event.dataTransfer.files);
          }
        }}
        onClick={() => !uploading && inputRef.current?.click()}
        className={`flex min-h-[130px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition ${
          dragOver
            ? "border-violet-400 bg-violet-50"
            : "border-slate-200 bg-slate-50 hover:border-violet-300 hover:bg-violet-50/50"
        }`}
      >
        {uploading ? (
          <>
            <Loader2 size={28} className="animate-spin text-violet-600" />
            <p className="mt-2 text-xs text-slate-500">Uploading...</p>
          </>
        ) : (
          <>
            <ImageIcon size={30} className="text-slate-400" />
            <p className="mt-2 text-xs font-semibold text-slate-700">
              Add Banner / Image
            </p>
            <p className="mt-1 text-[10px] text-slate-400">
              Click • Drag & drop • or paste (Ctrl/Cmd+V)
            </p>
          </>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/gif,image/webp"
        className="hidden"
        onChange={(event) => {
          if (event.target.files?.length) handleFiles(event.target.files);
          event.target.value = "";
        }}
      />
    </>
  );
};

const MessageEditor = ({
  blocks,
  onChange,
  onNotify,
}: {
  blocks: MessageBlock[];
  onChange: (blocks: MessageBlock[]) => void;
  onNotify?: (type: PopupType, title: string, message: string) => void;
}) => {
  const updateBlock = (id: string, updates: Partial<MessageBlock>) => {
    onChange(
      blocks.map((block) =>
        block.id === id ? { ...block, ...updates } : block
      )
    );
  };

  const removeBlock = (id: string) => {
    const next = blocks.filter((block) => block.id !== id);
    onChange(next.length ? next : [createTextBlock()]);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-3 sm:p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold text-slate-700">
            Format your message
          </p>
          <p className="mt-0.5 text-[9px] text-slate-400">
            Style text and add banners/images just like the Campaign editor.
          </p>
        </div>
        <div className="rounded-full bg-white px-2.5 py-1 text-[9px] font-medium text-slate-400 ring-1 ring-slate-200">
          Rich message
        </div>
      </div>

      <div className="space-y-3">
        {blocks.map((block, index) => (
          <div
            key={block.id}
            className="relative rounded-xl border border-slate-200 bg-white p-3 shadow-sm"
          >
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-wider text-slate-400">
                {block.type === "text" ? <Type size={11} /> : <ImagePlus size={11} />}
                {block.type === "text" ? `Text ${index + 1}` : `Image ${index + 1}`}
              </div>

              {blocks.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeBlock(block.id)}
                  className="rounded-md p-1 text-slate-300 hover:bg-red-50 hover:text-red-500"
                  title="Remove block"
                >
                  <Trash2 size={12} />
                </button>
              )}
            </div>

            {block.type === "text" ? (
              <TextBlockEditor
                block={block}
                onUpdate={(updates) => updateBlock(block.id, updates)}
              />
            ) : (
              <ImageBlockEditor
                block={block}
                onUpdate={(updates) => updateBlock(block.id, updates)}
                onNotify={onNotify}
              />
            )}
          </div>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onChange([...blocks, createTextBlock()])}
          className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-[10px] font-semibold text-slate-600 hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700"
        >
          <Plus size={12} /> Add Text
        </button>
        <button
          type="button"
          onClick={() => onChange([...blocks, createImageBlock()])}
          className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-[10px] font-semibold text-slate-600 hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700"
        >
          <ImagePlus size={12} /> Add Banner / Image
        </button>
      </div>
    </div>
  );
};

const MessageRenderer = ({
  message,
  compact = false,
}: {
  message?: string;
  compact?: boolean;
}) => {
  const blocks = parseMessageBlocks(message);

  return (
    <div className={compact ? "max-h-[90px] overflow-hidden" : "space-y-3"}>
      {blocks.map((block) => {
        if (block.type === "image" && block.url) {
          return (
            <img
              key={block.id}
              src={block.url}
              alt="Announcement"
              className={`w-full rounded-lg object-cover ${
                compact ? "max-h-[85px]" : "max-h-[280px]"
              }`}
            />
          );
        }

        if (block.type === "text") {
          return (
            <div
              key={block.id}
              style={{
                color: block.color || "#334155",
                backgroundColor:
                  block.backgroundColor && block.backgroundColor !== "transparent"
                    ? block.backgroundColor
                    : "transparent",
                fontSize: compact
                  ? Math.min(Number(block.fontSize || 14), 12)
                  : Number(block.fontSize || 14),
                fontWeight: block.fontWeight || "normal",
                fontStyle: block.fontStyle || "normal",
                textAlign: block.textAlign || "left",
                fontFamily: block.fontFamily || "Arial",
              }}
              className="whitespace-pre-wrap break-words leading-6"
            >
              {block.content || ""}
            </div>
          );
        }

        return null;
      })}
    </div>
  );
};

const Announcements = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const [selectedAnnouncement, setSelectedAnnouncement] =
    useState<Announcement | null>(null);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] =
    useState<Announcement | null>(null);

  const [form, setForm] = useState<AnnouncementForm>({
    title: "",
    message: "",
    priority: "Notice",
    expiresAt: "",
  });

  const [messageBlocks, setMessageBlocks] = useState<MessageBlock[]>([
    createTextBlock(),
  ]);

  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [popup, setPopup] = useState<PopupState>({
    open: false,
    type: "info",
    title: "",
    message: "",
  });

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      setRefreshing(true);
      setError("");

      const response = await axios.get(
        `${API_URL}/api/admin/announcements`,
        { withCredentials: true }
      );

      if (response.data?.success) {
        setAnnouncements(response.data.data || []);
      } else {
        setAnnouncements([]);
      }
    } catch (err: any) {
      console.error("Failed to fetch announcements:", err);
      setError(
        err?.response?.data?.message || "Failed to load announcements"
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const openCreateModal = () => {
    setEditingAnnouncement(null);
    const initialBlocks = [createTextBlock()];
    setMessageBlocks(initialBlocks);
    setForm({
      title: "",
      message: JSON.stringify(initialBlocks),
      priority: "Notice",
      expiresAt: "",
    });
    setShowCreateModal(true);
  };

  const openEditModal = (
    event: React.MouseEvent,
    announcement: Announcement
  ) => {
    event.stopPropagation();

    const blocks = parseMessageBlocks(getMessage(announcement));
    setEditingAnnouncement(announcement);
    setMessageBlocks(blocks);

    let expiryValue = getExpiryDate(announcement);
    if (expiryValue) {
      const date = new Date(expiryValue);
      if (!Number.isNaN(date.getTime())) {
        expiryValue = getDateInputValue(expiryValue);
      }
    }

    setForm({
      title: announcement.title || "",
      message: JSON.stringify(blocks),
      priority: announcement.priority || "Notice",
      expiresAt: expiryValue || "",
    });

    setShowCreateModal(true);
  };

  const closeFormModal = () => {
    if (saving) return;
    setShowCreateModal(false);
    setEditingAnnouncement(null);
    setMessageBlocks([createTextBlock()]);
    setForm({
      title: "",
      message: "",
      priority: "Notice",
      expiresAt: "",
    });
  };

  const updateMessageBlocks = (blocks: MessageBlock[]) => {
    setMessageBlocks(blocks);
    setForm((previous) => ({
      ...previous,
      message: JSON.stringify(blocks),
    }));
  };

  const hasMessageContent = () => {
    return messageBlocks.some((block) => {
      if (block.type === "image") return Boolean(block.url);
      return Boolean(block.content?.trim());
    });
  };

  const showPopup = (
    type: PopupType,
    title: string,
    message: string,
    options?: {
      confirmText?: string;
      cancelText?: string;
      onConfirm?: () => void;
    }
  ) => {
    setPopup({
      open: true,
      type,
      title,
      message,
      confirmText: options?.confirmText,
      cancelText: options?.cancelText,
      onConfirm: options?.onConfirm,
    });
  };

  const closePopup = () => {
    setPopup((previous) => ({ ...previous, open: false, onConfirm: undefined }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.title.trim()) {
      showPopup("warning", "Title Required", "Please enter announcement title.");
      return;
    }

    if (!hasMessageContent()) {
      showPopup("warning", "Message Required", "Please enter announcement message or add an image.");
      return;
    }

    if (!form.expiresAt) {
      showPopup("warning", "Expiry Date Required", "Please select an expiry date for the announcement.");
      return;
    }

    const today = getTodayInputValue();
    if (form.expiresAt < today) {
      showPopup("warning", "Invalid Expiry Date", "Expiry date cannot be before today.");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        title: form.title.trim(),
        message: JSON.stringify(messageBlocks),
        priority: form.priority,
        expiresAt: form.expiresAt,
      };

      const response = editingAnnouncement
        ? await axios.put(
            `${API_URL}/api/admin/announcements/${editingAnnouncement.id}`,
            payload,
            { withCredentials: true }
          )
        : await axios.post(
            `${API_URL}/api/admin/announcements`,
            payload,
            { withCredentials: true }
          );

      closeFormModal();
      await fetchAnnouncements();

      showPopup(
        "success",
        editingAnnouncement ? "Announcement Updated" : "Announcement Created",
        response?.data?.message ||
          response?.data?.msg ||
          (editingAnnouncement
            ? "Announcement updated successfully."
            : "Announcement created successfully.")
      );
    } catch (err: any) {
      console.error("Announcement save error:", err);
      showPopup(
        "error",
        editingAnnouncement ? "Update Failed" : "Creation Failed",
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          (editingAnnouncement
            ? "Failed to update announcement."
            : "Failed to create announcement.")
      );
    } finally {
      setSaving(false);
    }
  };

  const performDelete = async (announcement: Announcement) => {
    try {
      setDeletingId(announcement.id);

      const response = await axios.delete(
        `${API_URL}/api/admin/announcements/${announcement.id}`,
        { withCredentials: true }
      );

      setAnnouncements((previous) =>
        previous.filter((item) => item.id !== announcement.id)
      );

      if (selectedAnnouncement?.id === announcement.id) {
        setSelectedAnnouncement(null);
      }

      showPopup(
        "success",
        "Announcement Deleted",
        response?.data?.message ||
          response?.data?.msg ||
          "The announcement has been deleted successfully."
      );
    } catch (err: any) {
      console.error("Failed to delete announcement:", err);
      showPopup(
        "error",
        "Delete Failed",
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Failed to delete announcement."
      );
    } finally {
      setDeletingId(null);
    }
  };

  const handleDelete = (
    event: React.MouseEvent,
    announcement: Announcement
  ) => {
    event.stopPropagation();

    showPopup(
      "confirm",
      "Delete Announcement?",
      `Are you sure you want to delete "${announcement.title || "this announcement"}"? This action cannot be undone.`,
      {
        confirmText: "Delete",
        cancelText: "Cancel",
        onConfirm: () => {
          setTimeout(() => performDelete(announcement), 0);
        },
      }
    );
  };

  return (
    <>
      <section className="min-h-full w-full bg-slate-50 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="mx-auto w-full max-w-[1400px]">
          <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 shadow-sm ring-1 ring-blue-100">
                <Megaphone size={20} />
              </div>
              <div>
                <h1 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                  Announcements
                </h1>
                <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                  Stay updated with the latest announcements from your community.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={openCreateModal}
                className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 text-xs font-semibold text-white shadow-sm shadow-blue-200 transition hover:bg-blue-700"
              >
                <Plus size={14} />
                Create Announcement
              </button>

              <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="text-xs font-medium text-slate-600">
                  {announcements.length} {announcements.length === 1 ? "announcement" : "announcements"}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white shadow-[0_2px_12px_rgba(15,23,42,0.04)]">
            <div className="flex flex-col gap-4 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Bell size={17} />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-slate-900 sm:text-[15px]">
                    Published Announcements
                  </h2>
                  <p className="mt-0.5 text-[11px] text-slate-400">
                    Important updates and messages for residents
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={fetchAnnouncements}
                disabled={refreshing}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 disabled:opacity-60"
              >
                <RefreshCw size={15} className={refreshing ? "animate-spin" : ""} />
              </button>
            </div>

            <div className="p-5 sm:p-6">
              {loading && (
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  {[1, 2].map((item) => (
                    <div key={item} className="h-[175px] animate-pulse rounded-xl border border-slate-200 bg-white p-4">
                      <div className="flex gap-3">
                        <div className="h-9 w-9 rounded-lg bg-slate-100" />
                        <div className="flex-1">
                          <div className="h-3.5 w-2/5 rounded bg-slate-100" />
                          <div className="mt-5 h-2.5 w-full rounded bg-slate-100" />
                          <div className="mt-2 h-2.5 w-5/6 rounded bg-slate-100" />
                          <div className="mt-5 h-2.5 w-1/2 rounded bg-slate-100" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {!loading && error && (
                <div className="flex flex-col items-center justify-center rounded-xl border border-red-100 bg-red-50/50 px-6 py-12 text-center">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-100 text-red-500">
                    <Bell size={18} />
                  </div>
                  <p className="mt-4 text-sm font-semibold text-slate-800">Unable to load announcements</p>
                  <p className="mt-1 max-w-md text-xs text-slate-500">{error}</p>
                  <button type="button" onClick={fetchAnnouncements} className="mt-5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-medium text-white hover:bg-blue-700">
                    Try Again
                  </button>
                </div>
              )}

              {!loading && !error && announcements.length === 0 && (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/50 px-6 py-16 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-300 shadow-sm ring-1 ring-slate-100">
                    <Megaphone size={25} />
                  </div>
                  <p className="mt-5 text-sm font-semibold text-slate-700">No announcements yet</p>
                  <p className="mt-1 max-w-sm text-xs leading-5 text-slate-400">
                    There are currently no published announcements available for your community.
                  </p>
                </div>
              )}

              {!loading && !error && announcements.length > 0 && (
                <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                  {announcements.map((announcement) => {
                    const priority = announcement.priority || "General";
                    const publishedDate = getPublishedDate(announcement);
                    const expiryDate = getExpiryDate(announcement);
                    const styles = getPriorityStyles(priority);

                    return (
                      <div
                        key={announcement.id}
                        onClick={() => setSelectedAnnouncement(announcement)}
                        className="group relative cursor-pointer overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_2px_8px_rgba(15,23,42,0.04)] transition hover:-translate-y-[1px] hover:border-slate-300 hover:shadow-[0_8px_24px_rgba(15,23,42,0.08)]"
                      >
                        <div className={`absolute left-0 top-0 h-full w-[3px] ${styles.accent}`} />
                        <div className="px-4 py-4 sm:px-5">
                          <div className="flex items-start gap-3">
                            <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${styles.icon}`}>
                              <Megaphone size={15} />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-start justify-between gap-3">
                                <h3 className="min-w-0 truncate text-[13px] font-semibold text-slate-900">
                                  {announcement.title || "Announcement"}
                                </h3>
                                <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[9px] font-medium ${styles.badge}`}>
                                  {priority}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="ml-12 mt-3 rounded-lg bg-slate-50/70 p-2">
                            <MessageRenderer message={getMessage(announcement)} compact />
                          </div>

                          <div className="ml-12 my-3 border-t border-slate-100" />

                          <div className="ml-12 flex flex-wrap items-center gap-x-5 gap-y-2">
                            <div className="flex items-center gap-1.5">
                              <Clock3 size={11} className="text-blue-500" />
                              <span className="text-[9px] text-slate-400">Published</span>
                              <span className="text-[9px] font-medium text-slate-600">{formatDate(publishedDate)}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <CalendarDays size={11} className="text-amber-500" />
                              <span className="text-[9px] text-slate-400">Expires</span>
                              <span className="text-[9px] font-medium text-slate-600">{formatDate(expiryDate)}</span>
                            </div>
                          </div>

                          <div className="ml-12 mt-3 flex items-center justify-end gap-2 border-t border-slate-100 pt-3" onClick={(event) => event.stopPropagation()}>
                            <button
                              type="button"
                              onClick={(event) => openEditModal(event, announcement)}
                              className="inline-flex h-7 items-center gap-1 rounded-lg border border-blue-100 bg-blue-50 px-2.5 text-[9px] font-medium text-blue-600 hover:bg-blue-100"
                            >
                              <Pencil size={11} /> Edit
                            </button>
                            <button
                              type="button"
                              onClick={(event) => handleDelete(event, announcement)}
                              disabled={deletingId === announcement.id}
                              className="inline-flex h-7 items-center gap-1 rounded-lg border border-red-100 bg-red-50 px-2.5 text-[9px] font-medium text-red-600 hover:bg-red-100 disabled:opacity-50"
                            >
                              {deletingId === announcement.id ? <RefreshCw size={11} className="animate-spin" /> : <Trash2 size={11} />}
                              Delete
                            </button>
                          </div>

                          <div className="mt-2 flex justify-end">
                            <span className="text-[9px] font-medium text-blue-500 opacity-0 transition group-hover:opacity-100">
                              Click to view details →
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {showCreateModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 py-5 backdrop-blur-sm"
          onClick={() => !saving && closeFormModal()}
        >
          <div
            className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/60 bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex shrink-0 items-start gap-3 border-b border-slate-100 px-5 py-5 sm:px-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                {editingAnnouncement ? <Pencil size={18} /> : <Megaphone size={18} />}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-base font-semibold text-slate-900">
                  {editingAnnouncement ? "Edit Announcement" : "Create Announcement"}
                </h3>
                <p className="mt-1 text-[10px] text-slate-400 sm:text-xs">
                  {editingAnnouncement
                    ? "Update the announcement details and formatting."
                    : "Publish a beautifully formatted announcement for your community residents."}
                </p>
              </div>
              <button
                type="button"
                onClick={closeFormModal}
                disabled={saving}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
              >
                <X size={17} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="min-h-0 overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
              <div className="mb-4">
                <label className="mb-1.5 block text-[11px] font-semibold text-slate-700">Title</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(event) => setForm((previous) => ({ ...previous, title: event.target.value }))}
                  placeholder="Enter announcement title"
                  className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="mb-4">
                <label className="mb-1.5 block text-[11px] font-semibold text-slate-700">Priority</label>
                <div className="grid grid-cols-3 gap-2">
                  {["Important", "Notice", "General"].map((priority) => {
                    const active = form.priority === priority;
                    const styles = getPriorityStyles(priority);
                    return (
                      <button
                        key={priority}
                        type="button"
                        onClick={() => setForm((previous) => ({ ...previous, priority }))}
                        className={`h-9 rounded-xl border text-[10px] font-semibold transition ${
                          active
                            ? styles.badge
                            : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
                        }`}
                      >
                        {priority}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mb-4">
                <label className="mb-1.5 block text-[11px] font-semibold text-slate-700">Message</label>
                <MessageEditor blocks={messageBlocks} onChange={updateMessageBlocks} onNotify={showPopup} />
              </div>

              <div className="mb-5">
                <label className="mb-1.5 block text-[11px] font-semibold text-slate-700">Expiry Date</label>
                <input
                  type="date"
                  value={form.expiresAt}
                  onChange={(event) => setForm((previous) => ({ ...previous, expiresAt: event.target.value }))}
                  className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 text-xs text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
                <p className="mt-1.5 text-[9px] text-slate-400">Select the date until which this announcement should remain active.</p>
              </div>

              <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
                <button
                  type="button"
                  disabled={saving}
                  onClick={closeFormModal}
                  className="h-9 rounded-xl border border-slate-200 bg-white px-4 text-[10px] font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-blue-600 px-4 text-[10px] font-semibold text-white shadow-sm shadow-blue-200 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? (
                    <>
                      <RefreshCw size={12} className="animate-spin" />
                      {editingAnnouncement ? "Updating..." : "Publishing..."}
                    </>
                  ) : (
                    <>
                      {editingAnnouncement ? <Pencil size={12} /> : <Send size={12} />}
                      {editingAnnouncement ? "Update Announcement" : "Publish Announcement"}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedAnnouncement && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 py-6 backdrop-blur-sm"
          onClick={() => setSelectedAnnouncement(null)}
        >
          <div
            className="w-full max-w-2xl overflow-hidden rounded-2xl border border-white/60 bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start gap-3 border-b border-slate-100 px-5 py-5 sm:px-6">
              <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${getPriorityStyles(selectedAnnouncement.priority).icon}`}>
                <Megaphone size={20} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base font-semibold text-slate-900 sm:text-lg">
                    {selectedAnnouncement.title || "Announcement"}
                  </h3>
                  <span className={`rounded-full border px-2 py-0.5 text-[9px] font-medium ${getPriorityStyles(selectedAnnouncement.priority).badge}`}>
                    {selectedAnnouncement.priority || "General"}
                  </span>
                </div>
                <p className="mt-1 text-[10px] text-slate-400 sm:text-xs">
                  Published on {formatDate(getPublishedDate(selectedAnnouncement))}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedAnnouncement(null)}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={17} />
              </button>
            </div>

            <div className="max-h-[65vh] overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
              <div className="mb-3 flex items-center gap-2">
                <Sparkles size={13} className="text-blue-500" />
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">Announcement Message</p>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-4 sm:p-5">
                <MessageRenderer message={getMessage(selectedAnnouncement)} />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 border-t border-slate-100 bg-slate-50/70 px-5 py-4 sm:grid-cols-2 sm:px-6">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600"><Clock3 size={14} /></div>
                <div>
                  <p className="text-[9px] uppercase tracking-wider text-slate-400">Published</p>
                  <p className="mt-0.5 text-[11px] font-medium text-slate-700">{formatDate(getPublishedDate(selectedAnnouncement))}</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600"><CalendarDays size={14} /></div>
                <div>
                  <p className="text-[9px] uppercase tracking-wider text-slate-400">Expires</p>
                  <p className="mt-0.5 text-[11px] font-medium text-slate-700">{formatDate(getExpiryDate(selectedAnnouncement))}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <PopupModal popup={popup} onClose={closePopup} />
    </>
  );
};

export default Announcements;
