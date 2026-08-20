


"use client";

import React, { useState, useEffect, useContext, useCallback, useRef } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { AuthContext } from "../../../../../../context/AuthContext"; // ← adjust path
import {
  Mail,
  Upload,
  Calendar,
  ChevronDown,
  Link2,
  Smile,
  ArrowLeft,
  Send,
  FileText,
  Image as ImageIcon,
  Type as TypeIcon,
  Square,
  Minus,
  Trash2,
  Loader2,
  Check,
  Plus,
} from "lucide-react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";

const API = String(import.meta.env.VITE_BACKEND_URL);

// ===================== TYPES =====================
type BlockType = "text" | "image" | "button" | "logo" | "divider";

interface Block {
  id: string;
  type: BlockType;
  content?: string;
  url?: string;
  buttonText?: string;
  buttonLink?: string;
  align?: "left" | "center" | "right";
  serverId?: string;
  // Text styling
  color?: string;
  backgroundColor?: string;
  fontSize?: number;
  fontWeight?: "normal" | "bold";
  fontStyle?: "normal" | "italic";
  textAlign?: "left" | "center" | "right";
}

// ===================== HELPERS =====================
const generateId = () => Math.random().toString(36).slice(2, 11);

function uiBlockToApi(block: Block, sortOrder: number) {
  const content: Record<string, unknown> = {};
  switch (block.type) {
    case "text":
      content.text = block.content ?? "";
      content.color = block.color ?? "#334155";
      content.backgroundColor = block.backgroundColor ?? "transparent";
      content.fontSize = block.fontSize ?? 14;
      content.fontWeight = block.fontWeight ?? "normal";
      content.fontStyle = block.fontStyle ?? "normal";
      content.textAlign = block.textAlign ?? "left";
      break;
    case "image":
    case "logo":
      content.url = block.url ?? "";
      break;
    case "button":
      content.buttonText = block.buttonText ?? "";
      content.buttonLink = block.buttonLink ?? "";
      content.align = block.align ?? "center";
      break;
    case "divider":
      break;
  }
  return {
    block_type: block.type,
    content,
    sort_order: sortOrder,
  };
}

function apiBlockToUi(row: {
  id: string;
  blockType: string;
  content: any;
  sortOrder: number;
}): Block {
  const c = row.content || {};
  return {
    id: row.id,
    serverId: row.id,
    type: row.blockType as BlockType,
    content: c.text ?? "",
    url: c.url ?? "",
    buttonText: c.buttonText ?? "",
    buttonLink: c.buttonLink ?? "",
    align: (c.align as "left" | "center" | "right") ?? "center",
    color: c.color ?? "#334155",
    backgroundColor: c.backgroundColor ?? "transparent",
    fontSize: c.fontSize ?? 14,
    fontWeight: (c.fontWeight as "normal" | "bold") ?? "normal",
    fontStyle: (c.fontStyle as "normal" | "italic") ?? "normal",
    textAlign: (c.textAlign as "left" | "center" | "right") ?? "left",
  };
}

// ===================== IMAGE UPLOAD =====================
async function uploadImageFile(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("image", file);

  const res = await axios.post(`${API}/api/upload/image`, formData, {
    withCredentials: true,
    headers: { "Content-Type": "multipart/form-data" },
  });

  if (!res.data?.success || !res.data?.url) {
    throw new Error(res.data?.message || "Upload failed");
  }
  return res.data.url as string;
}

function isImageFile(file: File) {
  return file.type.startsWith("image/");
}

// ===================== IMAGE / LOGO BLOCK EDITOR =====================
const ImageBlockEditor = ({
  block,
  onUpdate,
  onError,
  isLogo = false,
}: {
  block: Block;
  onUpdate: (updates: Partial<Block>) => void;
  onError: (msg: string | null) => void;
  isLogo?: boolean;
}) => {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);

  const handleFiles = async (files: FileList | File[]) => {
    const file = Array.from(files).find(isImageFile);
    if (!file) {
      onError("Please select an image file (PNG, JPG, GIF, WebP)");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      onError("Image must be under 8 MB");
      return;
    }

    try {
      setUploading(true);
      onError(null);
      const url = await uploadImageFile(file);
      onUpdate({ url });
    } catch (err: any) {
      console.error(err);
      onError(err?.message || "Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  // Paste support (Gmail-style)
  useEffect(() => {
    const el = dropRef.current;
    if (!el) return;

    const onPaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (const item of Array.from(items)) {
        if (item.type.startsWith("image/")) {
          e.preventDefault();
          const file = item.getAsFile();
          if (file) handleFiles([file]);
          break;
        }
      }
    };

    el.addEventListener("paste", onPaste as any);
    el.tabIndex = 0; // make focusable so paste works

    return () => el.removeEventListener("paste", onPaste as any);
  }, []);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files?.length) {
      handleFiles(e.dataTransfer.files);
    }
  };

  return (
    <div>
      {block.url ? (
        <div style={{ position: "relative", textAlign: isLogo ? "center" : "left" }}>
          <img
            src={block.url}
            alt={isLogo ? "Logo" : "Banner"}
            style={
              isLogo
                ? {
                    maxHeight: 80,
                    maxWidth: 200,
                    objectFit: "contain",
                    display: "block",
                    margin: "0 auto",
                  }
                : {
                    width: "100%",
                    borderRadius: 8,
                    maxHeight: 220,
                    objectFit: "cover",
                  }
            }
          />
          <button
            type="button"
            onClick={() => onUpdate({ url: "" })}
            style={{
              position: "absolute",
              top: 30,
              right: 8,
              background: "rgba(0,0,0,0.65)",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              padding: "4px 10px",
              fontSize: 12,
              cursor: "pointer",
            }}
          >
            Remove
          </button>
        </div>
      ) : (
        <div
          ref={dropRef}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          onClick={() => !uploading && fileInputRef.current?.click()}
          style={{
            ...(isLogo ? styles.logoPlaceholder : styles.imagePlaceholder),
            border: dragOver ? "2px dashed #7c3aed" : "2px dashed #cbd5e1",
            background: dragOver ? "#f5f3ff" : "#f8fafc",
            cursor: uploading ? "wait" : "pointer",
            outline: "none",
            transition: "all 0.15s",
          }}
        >
          {uploading ? (
            <>
              <Loader2 size={28} className="animate-spin" color="#7c3aed" />
              <p style={{ margin: "8px 0 0", fontSize: 13 }}>Uploading…</p>
            </>
          ) : (
            <>
              <ImageIcon size={isLogo ? 28 : 32} color="#94a3b8" />
              <p style={{ margin: "8px 0 4px", fontWeight: 500, color: "#334155" }}>
                {isLogo ? "Add Logo" : "Add Banner / Image"}
              </p>
              <p style={{ fontSize: 12, color: "#94a3b8", margin: 0 }}>
                Click • Drag & drop • or paste (Ctrl/Cmd+V)
              </p>
            </>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/gif,image/webp"
        style={{ display: "none" }}
        onChange={(e) => {
          if (e.target.files?.length) handleFiles(e.target.files);
          e.target.value = "";
        }}
      />

      {/* Still allow pasting a URL if preferred */}
      <input
        style={{
          ...styles.input,
          marginTop: 8,
          marginBottom: 0,
          maxWidth: isLogo ? 320 : undefined,
        }}
        placeholder="Or paste image URL here..."
        value={block.url || ""}
        onChange={(e) => onUpdate({ url: e.target.value })}
      />
    </div>
  );
};

// ===================== EMOJI PICKER =====================
const COMMON_EMOJIS = [
  "😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇",
  "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚",
  "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🤩",
  "🥳", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣",
  "😖", "😫", "😩", "🥺", "😢", "😭", "😤", "😠", "😡", "🤬",
  "👍", "👎", "👏", "🙌", "👐", "🤝", "🙏", "✌️", "🤞", "🤟",
  "🤘", "👌", "🤏", "👈", "👉", "👆", "👇", "☝️", "✋", "🤚",
  "👋", "💪", "🦾", "❤️", "🧡", "💛", "💚", "💙", "💜", "🖤",
  "🤍", "🤎", "💔", "❣️", "💕", "💞", "💓", "💗", "💖", "💘",
  "💝", "💟", "☮️", "✝️", "☪️", "🕉", "☸️", "✡️", "🔯", "🕎",
  "🔥", "⭐", "🌟", "✨", "💫", "🎉", "🎊", "🎈", "🎁", "🏆",
  "🥇", "🥈", "🥉", "⚽", "🏀", "🏈", "⚾", "🎾", "🏐", "🏉",
  "📧", "📩", "📨", "💌", "📱", "💻", "🖥️", "⌨️", "🖨️", "🖱️",
  "✅", "❌", "❗", "❓", "💯", "🔔", "🔕", "📢", "📣", "💬",
];

const EmojiPicker = ({
  onSelect,
  onClose,
}: {
  onSelect: (emoji: string) => void;
  onClose: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        top: "100%",
        left: 0,
        zIndex: 50,
        background: "#fff",
        border: "1px solid #e2e8f0",
        borderRadius: 10,
        padding: 10,
        boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
        width: 280,
        maxHeight: 220,
        overflowY: "auto",
        display: "grid",
        gridTemplateColumns: "repeat(8, 1fr)",
        gap: 4,
      }}
    >
      {COMMON_EMOJIS.map((emoji) => (
        <button
          key={emoji}
          type="button"
          onClick={() => {
            onSelect(emoji);
            onClose();
          }}
          style={{
            border: "none",
            background: "transparent",
            fontSize: 20,
            cursor: "pointer",
            padding: 4,
            borderRadius: 6,
            lineHeight: 1.2,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#f1f5f9";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
          }}
        >
          {emoji}
        </button>
      ))}
    </div>
  );
};

// ===================== TEXT BLOCK EDITOR =====================
const TextBlockEditor = ({
  block,
  onUpdate,
  placeholder,
}: {
  block: Block;
  onUpdate: (updates: Partial<Block>) => void;
  placeholder?: string;
}) => {
  const [showEmoji, setShowEmoji] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);

  const insertEmoji = (emoji: string) => {
    const ta = textareaRef.current;
    if (!ta) {
      onUpdate({ content: (block.content || "") + emoji });
      return;
    }
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const text = block.content || "";
    const newText = text.slice(0, start) + emoji + text.slice(end);
    onUpdate({ content: newText });
    // Restore cursor after React re-render
    requestAnimationFrame(() => {
      if (textareaRef.current) {
        const pos = start + emoji.length;
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(pos, pos);
      }
    });
  };

  const fontSizes = [12, 13, 14, 15, 16, 18, 20, 22, 24, 28, 32];

  return (
    <div>
      {/* Formatting toolbar */}
      <div
        ref={toolbarRef}
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 8,
          marginBottom: 8,
          padding: "8px 10px",
          background: "#f8fafc",
          borderRadius: 8,
          border: "1px solid #e2e8f0",
        }}
      >
        {/* Text color */}
        <label style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#64748b" }}>
          <span>Color</span>
          <input
            type="color"
            value={block.color && block.color !== "transparent" ? block.color : "#334155"}
            onChange={(e) => onUpdate({ color: e.target.value })}
            style={{
              width: 28,
              height: 28,
              border: "1px solid #e2e8f0",
              borderRadius: 6,
              cursor: "pointer",
              padding: 0,
              background: "none",
            }}
            title="Text color"
          />
        </label>

        {/* Background color */}
        <label style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#64748b" }}>
          <span>Bg</span>
          <input
            type="color"
            value={
              block.backgroundColor && block.backgroundColor !== "transparent"
                ? block.backgroundColor
                : "#ffffff"
            }
            onChange={(e) => onUpdate({ backgroundColor: e.target.value })}
            style={{
              width: 28,
              height: 28,
              border: "1px solid #e2e8f0",
              borderRadius: 6,
              cursor: "pointer",
              padding: 0,
              background: "none",
            }}
            title="Background color"
          />
          <button
            type="button"
            onClick={() => onUpdate({ backgroundColor: "transparent" })}
            style={{
              fontSize: 11,
              padding: "2px 6px",
              border: "1px solid #e2e8f0",
              borderRadius: 4,
              background: "#fff",
              cursor: "pointer",
              color: "#64748b",
            }}
            title="Clear background"
          >
            Clear
          </button>
        </label>

        {/* Font size */}
        <label style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#64748b" }}>
          <span>Size</span>
          <select
            value={block.fontSize ?? 14}
            onChange={(e) => onUpdate({ fontSize: Number(e.target.value) })}
            style={{
              padding: "4px 6px",
              borderRadius: 6,
              border: "1px solid #e2e8f0",
              fontSize: 12,
              background: "#fff",
              cursor: "pointer",
            }}
          >
            {fontSizes.map((s) => (
              <option key={s} value={s}>
                {s}px
              </option>
            ))}
          </select>
        </label>

        {/* Bold */}
        <button
          type="button"
          onClick={() =>
            onUpdate({
              fontWeight: block.fontWeight === "bold" ? "normal" : "bold",
            })
          }
          style={{
            width: 28,
            height: 28,
            border: block.fontWeight === "bold" ? "2px solid #7c3aed" : "1px solid #e2e8f0",
            borderRadius: 6,
            background: block.fontWeight === "bold" ? "#f5f3ff" : "#fff",
            fontWeight: 700,
            fontSize: 13,
            cursor: "pointer",
            color: "#334155",
          }}
          title="Bold"
        >
          B
        </button>

        {/* Italic */}
        <button
          type="button"
          onClick={() =>
            onUpdate({
              fontStyle: block.fontStyle === "italic" ? "normal" : "italic",
            })
          }
          style={{
            width: 28,
            height: 28,
            border: block.fontStyle === "italic" ? "2px solid #7c3aed" : "1px solid #e2e8f0",
            borderRadius: 6,
            background: block.fontStyle === "italic" ? "#f5f3ff" : "#fff",
            fontStyle: "italic",
            fontSize: 13,
            cursor: "pointer",
            color: "#334155",
          }}
          title="Italic"
        >
          I
        </button>

        {/* Align */}
        {(["left", "center", "right"] as const).map((align) => (
          <button
            key={align}
            type="button"
            onClick={() => onUpdate({ textAlign: align })}
            style={{
              width: 28,
              height: 28,
              border:
                (block.textAlign || "left") === align
                  ? "2px solid #7c3aed"
                  : "1px solid #e2e8f0",
              borderRadius: 6,
              background:
                (block.textAlign || "left") === align ? "#f5f3ff" : "#fff",
              fontSize: 11,
              cursor: "pointer",
              color: "#334155",
            }}
            title={`Align ${align}`}
          >
            {align === "left" ? "⬅" : align === "center" ? "↔" : "➡"}
          </button>
        ))}

        {/* Emoji */}
        <div style={{ position: "relative" }}>
          <button
            type="button"
            onClick={() => setShowEmoji((v) => !v)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              padding: "4px 10px",
              border: "1px solid #e2e8f0",
              borderRadius: 6,
              background: showEmoji ? "#f5f3ff" : "#fff",
              fontSize: 12,
              cursor: "pointer",
              color: "#475569",
            }}
            title="Insert emoji"
          >
            <Smile size={14} /> Emoji
          </button>
          {showEmoji && (
            <EmojiPicker
              onSelect={insertEmoji}
              onClose={() => setShowEmoji(false)}
            />
          )}
        </div>
      </div>

      {/* Textarea with live styles */}
      <textarea
        ref={textareaRef}
        style={{
          ...styles.textBlock,
          color: block.color || "#334155",
          backgroundColor:
            block.backgroundColor && block.backgroundColor !== "transparent"
              ? block.backgroundColor
              : "#fff",
          fontSize: block.fontSize || 14,
          fontWeight: block.fontWeight || "normal",
          fontStyle: block.fontStyle || "normal",
          textAlign: block.textAlign || "left",
        }}
        value={block.content}
        onChange={(e) => onUpdate({ content: e.target.value })}
        rows={4}
        placeholder={placeholder || "Type your text here..."}
      />
    </div>
  );
};

// ===================== COMPONENT =====================
interface Props {
  onBack?: () => void;
}

const Campaign = ({ onBack }: Props) => {
  const { user } = useContext(AuthContext);

  // View
  const [showTemplates, setShowTemplates] = useState(true);

  // Templates
  const [templates, setTemplates] = useState<any[]>([]);
  const [templatesLoading, setTemplatesLoading] = useState(false);

  // Channel
  const [channel, setChannel] = useState("Email");
  const [activeTab, setActiveTab] = useState("Email");

  // Campaign meta
  const [campaignId, setCampaignId] = useState<string | null>(null);
  const [campaignName, setCampaignName] = useState("Untitled Campaign");
  const [category, setCategory] = useState("Event");
  const [subject, setSubject] = useState("");
  const [preheader, setPreheader] = useState(false);
  const [preheaderText, setPreheaderText] = useState("");

  // Recipients
  const [recipientsTab, setRecipientsTab] = useState<"enter" | "upload">("enter");
  const [recipients, setRecipients] = useState("");

  // Blocks
  const [blocks, setBlocks] = useState<Block[]>([
    {
      id: "1",
      type: "text",
      content: "Hi {{Name}},\n\nType your message here...",
      color: "#334155",
      backgroundColor: "transparent",
      fontSize: 14,
      fontWeight: "normal",
      fontStyle: "normal",
      textAlign: "left",
    },
  ]);

  // UI state
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // ---------- LOAD TEMPLATES ----------
  const loadTemplates = useCallback(async () => {
    try {
      setTemplatesLoading(true);
      const res = await axios.get(`${API}/api/campaigns`, {
        withCredentials: true,
      });
      setTemplates(res.data.data || []);
    } catch (err) {
      console.error("Failed to load templates", err);
    } finally {
      setTemplatesLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTemplates();
  }, [loadTemplates]);

  // ---------- LOAD SINGLE CAMPAIGN ----------
  const loadCampaign = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      const [campRes, blocksRes] = await Promise.all([
        axios.get(`${API}/api/campaigns/${id}`, { withCredentials: true }),
        axios.get(`${API}/api/campaigns/${id}/blocks`, { withCredentials: true }),
      ]);

      const camp = campRes.data.data;
      setCampaignId(camp.id);
      setCampaignName(camp.campaignName || "Untitled Campaign");
      setCategory(camp.category || "Event");
      setSubject(camp.subject || "");
      setPreheaderText(camp.preheader || "");
      setPreheader(!!camp.preheader);

      const ch = camp.channel || "Email";
      setChannel(ch);
      if (ch === "WhatsApp") setActiveTab("WhatsApp Message");
      else if (ch === "Social") setActiveTab("Social Media Post");
      else setActiveTab("Email");

      const apiBlocks = blocksRes.data.data || [];
      setBlocks(apiBlocks.length ? apiBlocks.map(apiBlockToUi) : []);
    } catch (err: any) {
      console.error(err);
      setError(err?.response?.data?.message || "Failed to load campaign");
    } finally {
      setLoading(false);
    }
  }, []);

  const openTemplate = async (id: string) => {
    setShowTemplates(false);
    await loadCampaign(id);
  };

  const startNewCampaign = () => {
    setShowTemplates(false);
    setCampaignId(null);
    setCampaignName("Untitled Campaign");
    setCategory("Event");
    setSubject("");
    setPreheader(false);
    setPreheaderText("");
    setChannel("Email");
    setActiveTab("Email");
    setRecipients("");
    setBlocks([
      {
        id: generateId(),
        type: "text",
        content: "Hi {{Name}},\n\nType your message here...",
        color: "#334155",
        backgroundColor: "transparent",
        fontSize: 14,
        fontWeight: "normal",
        fontStyle: "normal",
        textAlign: "left",
      },
    ]);
    setError(null);
    setSuccessMessage(null);
  };

  // ---------- FILE UPLOAD (CSV / Excel) ----------
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const rows: any[] = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        const emails: string[] = [];

        rows.forEach((row) => {
          if (!Array.isArray(row)) return;
          row.forEach((cell) => {
            if (typeof cell === "string" || typeof cell === "number") {
              const value = String(cell).trim();
              if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                emails.push(value);
              }
            }
          });
        });

        const uniqueEmails = [...new Set(emails)];

        if (uniqueEmails.length === 0) {
          setError("No valid email addresses found in the file");
          return;
        }

        setRecipients(uniqueEmails.join("\n"));
        setRecipientsTab("enter");
        setSuccessMessage(`${uniqueEmails.length} emails loaded from file`);
        setTimeout(() => setSuccessMessage(null), 3000);
      } catch (err) {
        console.error(err);
        setError("Failed to read the file. Please upload a valid CSV or Excel file.");
      }
    };

    reader.readAsArrayBuffer(file);
    e.target.value = "";
  };

  // ---------- BLOCK ACTIONS ----------
  const addBlock = (type: BlockType) => {
    const newBlock: Block = {
      id: generateId(),
      type,
      content: type === "text" ? "Type your text here..." : "",
      url: type === "image" || type === "logo" ? "" : undefined,
      buttonText: type === "button" ? "Click Here" : undefined,
      buttonLink: type === "button" ? "#" : undefined,
      align: "center",
      color: type === "text" ? "#334155" : undefined,
      backgroundColor: type === "text" ? "transparent" : undefined,
      fontSize: type === "text" ? 14 : undefined,
      fontWeight: type === "text" ? "normal" : undefined,
      fontStyle: type === "text" ? "normal" : undefined,
      textAlign: type === "text" ? "left" : undefined,
    };
    setBlocks((prev) => [...prev, newBlock]);
  };

  const updateBlock = (id: string, updates: Partial<Block>) => {
    setBlocks((prev) => prev.map((b) => (b.id === id ? { ...b, ...updates } : b)));
  };

  const removeBlock = (id: string) => {
    setBlocks((prev) => prev.filter((b) => b.id !== id));
  };

  const moveBlock = (index: number, direction: "up" | "down") => {
    setBlocks((prev) => {
      const next = [...prev];
      const target = direction === "up" ? index - 1 : index + 1;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  // ---------- SAVE DRAFT ----------
  const handleSaveDraft = async () => {
    try {
      setSaving(true);
      setError(null);

      const payload = {
        campaign_name: campaignName.trim() || "Untitled Campaign",
        channel:
          channel === "WhatsApp"
            ? "WhatsApp"
            : channel === "Social"
              ? "Social"
              : "Email",
        category: category || "Others",
        subject: channel === "Email" ? subject || null : null,
        preheader: channel === "Email" && preheader ? preheaderText || null : null,
        status: "Draft",
        scheduled_at: null,
      };

      let id = campaignId;

      if (!id) {
        const res = await axios.post(`${API}/api/campaigns`, payload, {
          withCredentials: true,
        });
        id = res.data.data.id;
        setCampaignId(id);
      } else {
        await axios.put(`${API}/api/campaigns/${id}`, payload, {
          withCredentials: true,
        });
      }

      // Replace blocks
      const existingRes = await axios.get(`${API}/api/campaigns/${id}/blocks`, {
        withCredentials: true,
      });
      const existing = existingRes.data.data || [];

      await Promise.all(
        existing.map((b: any) =>
          axios.delete(`${API}/api/campaigns/${id}/blocks/${b.id}`, {
            withCredentials: true,
          })
        )
      );

      for (let i = 0; i < blocks.length; i++) {
        await axios.post(
          `${API}/api/campaigns/${id}/blocks`,
          uiBlockToApi(blocks[i], i),
          { withCredentials: true }
        );
      }

      const refreshed = await axios.get(`${API}/api/campaigns/${id}/blocks`, {
        withCredentials: true,
      });
      setBlocks((refreshed.data.data || []).map(apiBlockToUi));

      setSuccessMessage("Campaign saved as draft");
      setTimeout(() => setSuccessMessage(null), 2500);
      loadTemplates();
    } catch (err: any) {
      console.error(err);
      setError(err?.response?.data?.message || "Failed to save campaign");
    } finally {
      setSaving(false);
    }
  };

  // ---------- SEND ----------
  const handleSend = async () => {
    if (channel !== "Email") {
      setError("Sending is currently only supported for Email campaigns");
      return;
    }

    const emails = recipients
      .split(/[,;\n]/)
      .map((e) => e.trim())
      .filter(Boolean);

    if (emails.length === 0) {
      setError("Please enter at least one recipient email or upload a file");
      return;
    }

    try {
      setSending(true);
      setError(null);

      let id = campaignId;

      const payload = {
        campaign_name: campaignName.trim() || "Untitled Campaign",
        channel: "Email",
        category: category || "Others",
        subject: subject || null,
        preheader: preheader ? preheaderText || null : null,
        status: "Draft",
        scheduled_at: null,
      };

      if (!id) {
        const res = await axios.post(`${API}/api/campaigns`, payload, {
          withCredentials: true,
        });
        id = res.data.data.id;
        setCampaignId(id);
      } else {
        await axios.put(`${API}/api/campaigns/${id}`, payload, {
          withCredentials: true,
        });
      }

      // Replace blocks
      const existingRes = await axios.get(`${API}/api/campaigns/${id}/blocks`, {
        withCredentials: true,
      });
      const existing = existingRes.data.data || [];

      await Promise.all(
        existing.map((b: any) =>
          axios.delete(`${API}/api/campaigns/${id}/blocks/${b.id}`, {
            withCredentials: true,
          })
        )
      );

      for (let i = 0; i < blocks.length; i++) {
        await axios.post(
          `${API}/api/campaigns/${id}/blocks`,
          uiBlockToApi(blocks[i], i),
          { withCredentials: true }
        );
      }

      // Send to all emails
      await axios.post(
        `${API}/api/campaigns/${id}/send`,
        { emails },
        { withCredentials: true }
      );

      setSuccessMessage(`Campaign sent to ${emails.length} recipient(s)`);
      setTimeout(() => setSuccessMessage(null), 3000);
      loadTemplates();
    } catch (err: any) {
      console.error(err);
      setError(err?.response?.data?.message || "Failed to send campaign");
    } finally {
      setSending(false);
    }
  };

  // ---------- HELPERS ----------
  const editorPlaceholder =
    activeTab === "Email"
      ? "Type your email content here..."
      : activeTab === "WhatsApp Message"
        ? "Type your WhatsApp message here..."
        : "Type your social post caption here...";

  const designTitle =
    activeTab === "Email"
      ? "Create Email"
      : activeTab === "WhatsApp Message"
        ? "Create WhatsApp Message"
        : "Create Social Media Post";

  // ---------- LOADING ----------
  if (loading) {
    return (
      <div
        style={{
          ...styles.page,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#64748b" }}>
          <Loader2 size={20} className="animate-spin" />
          Loading campaign...
        </div>
      </div>
    );
  }

  // ---------- RENDER ----------
  return (
    <div style={styles.page}>
      {/* Messages */}
      {successMessage && (
        <div style={styles.successMsg}>
          <Check size={15} />
          {successMessage}
        </div>
      )}
      {error && (
        <div style={styles.errorMsg}>
          {error}
          <button onClick={() => setError(null)} style={styles.dismissBtn}>
            Dismiss
          </button>
        </div>
      )}

      {/* ===================== TEMPLATES VIEW ===================== */}
      {showTemplates && (
        <div style={{ padding: "20px 24px", maxWidth: 1600, margin: "0 auto" }}>
          <div style={styles.card}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <div>
                <h3 style={styles.sectionTitle}>Your Campaigns & Templates</h3>
                <p style={styles.sectionHint}>
                  Open a previous campaign or start a new one
                </p>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                {onBack && (
                  <button style={styles.secondaryBtn} onClick={onBack}>
                    <ArrowLeft size={16} /> Back
                  </button>
                )}
                <button style={styles.primaryBtn} onClick={startNewCampaign}>
                  <Plus size={16} /> Create New Campaign
                </button>
              </div>
            </div>

            {templatesLoading ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  color: "#64748b",
                  padding: "40px 0",
                  justifyContent: "center",
                }}
              >
                <Loader2 size={18} className="animate-spin" />
                Loading campaigns...
              </div>
            ) : templates.length === 0 ? (
              <div style={{ textAlign: "center", padding: "50px 0", color: "#94a3b8" }}>
                <FileText size={40} style={{ marginBottom: 12, opacity: 0.4 }} />
                <p style={{ marginBottom: 16 }}>No campaigns yet</p>
                <button style={styles.primaryBtn} onClick={startNewCampaign}>
                  <Plus size={16} /> Create your first campaign
                </button>
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                  gap: 14,
                }}
              >
                {templates.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => openTemplate(t.id)}
                    style={styles.templateCard}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#7c3aed";
                      e.currentTarget.style.boxShadow =
                        "0 4px 12px rgba(124,58,237,0.12)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#e2e8f0";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 10,
                      }}
                    >
                      <span
                        style={{
                          ...styles.channelBadge,
                          background:
                            t.channel === "Email"
                              ? "#ede9fe"
                              : t.channel === "WhatsApp"
                                ? "#dcfce7"
                                : t.channel === "Social"
                                  ? "#dbeafe"
                                  : "#fef3c7",
                          color:
                            t.channel === "Email"
                              ? "#7c3aed"
                              : t.channel === "WhatsApp"
                                ? "#16a34a"
                                : t.channel === "Social"
                                  ? "#2563eb"
                                  : "#d97706",
                        }}
                      >
                        {t.channel || "Email"}
                      </span>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 500,
                          color: t.status === "Sent" ? "#16a34a" : "#64748b",
                        }}
                      >
                        {t.status || "Draft"}
                      </span>
                    </div>

                    <h4 style={styles.templateTitle}>
                      {t.campaignName || "Untitled"}
                    </h4>

                    <p style={{ margin: 0, fontSize: 12, color: "#94a3b8" }}>
                      {t.category || "—"} ·{" "}
                      {new Date(t.updatedAt || t.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ===================== EDITOR VIEW ===================== */}
      {!showTemplates && (
        <>
          <div style={styles.mainGrid}>
            {/* LEFT COLUMN */}
            <div style={styles.leftCol}>
              <button
                style={{ ...styles.secondaryBtn, marginBottom: 4, width: "100%" }}
                onClick={() => {
                  setShowTemplates(true);
                  loadTemplates();
                }}
              >
                ← Back to Templates
              </button>

              {/* Channel */}
              <div style={styles.card}>
                <h3 style={styles.sectionTitle}>1. Choose Channel</h3>
                <p style={styles.sectionHint}>Select the channel</p>

                <ChannelItem
                  icon={<Mail size={18} color="#7c3aed" />}
                  title="Email"
                  active={channel === "Email"}
                  onClick={() => {
                    setChannel("Email");
                    setActiveTab("Email");
                  }}
                />
                <ChannelItem
                  icon={<FaWhatsapp size={18} color="#25D366" />}
                  title="WhatsApp Message"
                  active={channel === "WhatsApp"}
                  onClick={() => {
                    setChannel("WhatsApp");
                    setActiveTab("WhatsApp Message");
                  }}
                />
                <ChannelItem
                  icon={<FaFacebook size={18} color="#1877F2" />}
                  title="Social Media Post"
                  active={channel === "Social"}
                  onClick={() => {
                    setChannel("Social");
                    setActiveTab("Social Media Post");
                  }}
                />
              </div>

              {/* Audience */}
              <div style={styles.card}>
                <h3 style={styles.sectionTitle}>2. Select Audience</h3>
                <p style={styles.sectionHint}>Choose audience or upload list</p>

                <select style={styles.select}>
                  <option>-- Select Contact List --</option>
                  <option>Education Expo Leads</option>
                  <option>Parents & Students 2024</option>
                </select>

                <p style={{ fontSize: 13, color: "#64748b", margin: "12px 0 8px" }}>
                  Or upload file (CSV/Excel)
                </p>

                <div style={styles.uploadBox}>
                  <Upload size={28} color="#7c3aed" />
                  <p style={{ margin: "10px 0 4px", fontWeight: 500, color: "#334155" }}>
                    Drag & drop CSV / Excel
                  </p>
                  <p style={{ fontSize: 13, color: "#94a3b8", marginBottom: 12 }}>or</p>
                  <label style={styles.browseBtn}>
                    <FileText size={15} /> Browse File
                    <input
                      type="file"
                      accept=".csv,.xls,.xlsx"
                      onChange={handleFileUpload}
                      style={{ display: "none" }}
                    />
                  </label>
                  <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 10 }}>
                    Supports .csv, .xls, .xlsx
                  </p>
                </div>
                {/* Manual Email Entry */}
<label style={styles.label}>Recipient Emails</label>

<textarea
  style={{
    ...styles.input,
    minHeight: "100px",
    resize: "vertical",
  }}
  value={recipients}
  onChange={(e) => setRecipients(e.target.value)}
  placeholder={`Enter emails separated by comma or new line

test1@example.com
test2@example.com
test3@example.com`}
></textarea>

<p style={{ fontSize: 12, color: "#64748b", marginTop: 6 }}>
  Enter one or multiple email addresses.
</p>

<div style={{ display: "flex", gap: 10, marginTop: 16 }}>
  <button
    style={styles.secondaryBtn}
    onClick={handleSaveDraft}
    disabled={saving || sending}
  >
    Save
  </button>

  <button
    style={styles.primaryBtn}
    onClick={handleSend}
    disabled={saving || sending}
  >
    {sending ? "Sending..." : "Send Campaign"}
  </button>
</div>
              </div>

              {/* Details */}
              <div style={styles.card}>
                <h3 style={styles.sectionTitle}>3. Campaign Details</h3>

                <label style={styles.label}>Campaign Name</label>
                <input
                  style={styles.input}
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  placeholder="e.g. Education Expo 2024"
                />

                <label style={styles.label}>Category</label>
                <select
                  style={styles.select}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="Event">Event</option>
                  <option value="Webinar">Webinar</option>
                  <option value="Promotion">Promotion</option>
                  <option value="Newsletter">Newsletter</option>
                  <option value="Others">Others</option>
                </select>

                <label style={styles.label}>Schedule (Optional)</label>
                <button style={styles.dateBtn}>
                  <Calendar size={16} />
                  Pick date & time
                </button>
              </div>

              {/* Actions */}
              {/* <div style={styles.leftActions}>
                <button
                  style={styles.secondaryBtn}
                  onClick={handleSaveDraft}
                  disabled={saving || sending}
                >
                  {saving ? (
                    <>
                      <Loader2
                        size={14}
                        className="animate-spin"
                        style={{ marginRight: 6 }}
                      />
                      Saving...
                    </>
                  ) : (
                    "Save as Draft"
                  )}
                </button>

                <button
                  style={styles.primaryBtn}
                  onClick={handleSend}
                  disabled={saving || sending}
                >
                  {sending ? (
                    <>
                      <Loader2
                        size={14}
                        className="animate-spin"
                        style={{ marginRight: 6 }}
                      />
                      Sending...
                    </>
                  ) : (
                    "Send Campaign"
                  )}
                </button>
              </div> */}
            </div>

            {/* CENTER COLUMN */}
            <div style={styles.centerCol}>
              <div style={styles.card}>
                <h3 style={styles.sectionTitle}>4. {designTitle}</h3>

                <div style={styles.tabs}>
                  {[
                    "Email",
                    "WhatsApp Message",
                    "Social Media Post",
                  ].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => {
                        if (tab === "Email") {
                          setChannel("Email");
                          setActiveTab("Email");
                        } else if (tab === "WhatsApp Message") {
                          setChannel("WhatsApp");
                          setActiveTab("WhatsApp Message");
                        } else {
                          setChannel("Social");
                          setActiveTab("Social Media Post");
                        }
                      }}
                      style={activeTab === tab ? styles.activeTab : styles.tab}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Email recipients + subject */}
             {/* Email recipients + subject */}
{/* Email Details only */}
{activeTab === "Email" && (
  <div style={styles.emailComposer}>
    <div style={styles.emailSectionCard}>
      <h4 style={{ margin: "0 0 10px", fontSize: 14 }}>
        Email Details
      </h4>
      <label style={styles.label}>Subject</label>
      <input
        style={styles.input}
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="Enter email subject"
      />
      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontSize: 13,
          marginTop: 4,
        }}
      >
        <input
          type="checkbox"
          checked={preheader}
          onChange={(e) => setPreheader(e.target.checked)}
        />
        Add preview text (Preheader)
      </label>
      {preheader && (
        <input
          style={{ ...styles.input, marginTop: 8 }}
          value={preheaderText}
          onChange={(e) => setPreheaderText(e.target.value)}
          placeholder="Preheader text..."
        />
      )}
    </div>
  </div>
)}
                {/* Toolbar */}
                <div style={styles.addToolbar}>
                  {/* <span
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      color: "#475569",
                      marginRight: 8,
                    }}
                  >
                    Add Element:
                  </span> */}
                  <button style={styles.addBtn} onClick={() => addBlock("text")}>
                    <TypeIcon size={14} /> Text
                  </button>
                  <button style={styles.addBtn} onClick={() => addBlock("image")}>
                    <ImageIcon size={14} /> Banner / Image
                  </button>
                  <button style={styles.addBtn} onClick={() => addBlock("logo")}>
                    <Square size={14} /> Logo
                  </button>
                  <button style={styles.addBtn} onClick={() => addBlock("button")}>
                    <Square size={14} /> Button
                  </button>
                  <button style={styles.addBtn} onClick={() => addBlock("divider")}>
                    <Minus size={14} /> Divider
                  </button>
                </div>

                {/* Canvas */}
                <div style={styles.canvas}>
                  {blocks.length === 0 && (
                    <div style={styles.emptyCanvas}>
                      <p>No content yet. Click the buttons above to start designing.</p>
                    </div>
                  )}

                  {blocks.map((block, index) => (
                    <div key={block.id} style={styles.blockWrapper}>
                      <div style={styles.blockControls}>
                        <button
                          style={styles.controlBtn}
                          onClick={() => moveBlock(index, "up")}
                        >
                          ↑
                        </button>
                        <button
                          style={styles.controlBtn}
                          onClick={() => moveBlock(index, "down")}
                        >
                          ↓
                        </button>
                        <button
                          style={{ ...styles.controlBtn, color: "#ef4444" }}
                          onClick={() => removeBlock(block.id)}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      {block.type === "text" && (
                        <TextBlockEditor
                          block={block}
                          onUpdate={(updates) => updateBlock(block.id, updates)}
                          placeholder={editorPlaceholder}
                        />
                      )}

                      {block.type === "image" && (
                        <ImageBlockEditor
                          block={block}
                          onUpdate={(updates) => updateBlock(block.id, updates)}
                          onError={setError}
                        />
                      )}

                      {block.type === "logo" && (
                        <ImageBlockEditor
                          block={block}
                          onUpdate={(updates) => updateBlock(block.id, updates)}
                          onError={setError}
                          isLogo
                        />
                      )}

                      {block.type === "button" && (
                        <div>
                          <div style={{ textAlign: block.align || "center" }}>
                            <button style={styles.previewButton}>
                              {block.buttonText || "Button"}
                            </button>
                          </div>
                          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                            <input
                              style={{
                                ...styles.input,
                                marginBottom: 0,
                                flex: 1,
                              }}
                              placeholder="Button Text"
                              value={block.buttonText || ""}
                              onChange={(e) =>
                                updateBlock(block.id, {
                                  buttonText: e.target.value,
                                })
                              }
                            />
                            <input
                              style={{
                                ...styles.input,
                                marginBottom: 0,
                                flex: 1,
                              }}
                              placeholder="Button Link (URL)"
                              value={block.buttonLink || ""}
                              onChange={(e) =>
                                updateBlock(block.id, {
                                  buttonLink: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                      )}

                      {block.type === "divider" && (
                        <hr
                          style={{
                            border: "none",
                            borderTop: "1px solid #e2e8f0",
                            margin: "12px 0",
                          }}
                        />
                      )}
                    </div>
                  ))}
                </div>

                {/* <div style={styles.editorFooter}>
                  <div style={{ display: "flex", gap: 12 }}>
                    <button style={styles.iconOnlyBtn}>
                      <Smile size={16} />
                    </button>
                    <button style={styles.iconOnlyBtn}>
                      <Link2 size={16} />
                    </button>
                  </div>
                  <button style={styles.addVariable}>
                    + Add Variable (e.g. {"{{Name}}"})
                  </button>
                </div> */}
              </div>
            </div>

            {/* RIGHT COLUMN - PREVIEW */}
            <div style={styles.rightCol}>
              <div style={styles.card}>
                <h3 style={styles.sectionTitle}>5. Preview</h3>
                <p style={styles.sectionHint}>Live preview of your design</p>

                {/* EMAIL PREVIEW */}
                {activeTab === "Email" && (
                  <div style={styles.previewCard}>
                    <div style={styles.previewHeader}>
                      <Mail size={16} color="#7c3aed" />
                      <span style={{ fontWeight: 600, fontSize: 13 }}>
                        Email Preview
                      </span>
                    </div>
                    <div style={styles.emailPreviewFrame}>
                      {subject && (
                        <div style={styles.previewSubject}>
                          <strong>Subject:</strong> {subject}
                        </div>
                      )}
                      <div style={styles.previewBody}>
                        {blocks.map((block) => {
                          if (block.type === "logo") {
                            return (
                              <div
                                key={block.id}
                                style={{ textAlign: "center", marginBottom: 12 }}
                              >
                                {block.url ? (
                                  <img
                                    src={block.url}
                                    alt="Logo"
                                    style={{
                                      maxHeight: 40,
                                      objectFit: "contain",
                                    }}
                                  />
                                ) : (
                                  <div style={styles.logoPlaceholder}>
                                    <ImageIcon size={16} color="#7c3aed" />
                                    <span>Your Logo</span>
                                  </div>
                                )}
                              </div>
                            );
                          }
                          if (block.type === "image" && block.url) {
                            return (
                              <img
                                key={block.id}
                                src={block.url}
                                alt=""
                                style={{
                                  width: "100%",
                                  borderRadius: 8,
                                  marginBottom: 12,
                                  maxHeight: 140,
                                  objectFit: "cover",
                                }}
                              />
                            );
                          }
                          if (block.type === "text") {
                            return (
                              <p
                                key={block.id}
                                style={{
                                  fontSize: block.fontSize || 14,
                                  lineHeight: 1.6,
                                  whiteSpace: "pre-wrap",
                                  margin: "0 0 12px",
                                  color: block.color || "#334155",
                                  backgroundColor:
                                    block.backgroundColor &&
                                    block.backgroundColor !== "transparent"
                                      ? block.backgroundColor
                                      : undefined,
                                  fontWeight: block.fontWeight || "normal",
                                  fontStyle: block.fontStyle || "normal",
                                  textAlign: block.textAlign || "left",
                                  padding:
                                    block.backgroundColor &&
                                    block.backgroundColor !== "transparent"
                                      ? "8px 10px"
                                      : undefined,
                                  borderRadius:
                                    block.backgroundColor &&
                                    block.backgroundColor !== "transparent"
                                      ? 6
                                      : undefined,
                                }}
                              >
                                {block.content}
                              </p>
                            );
                          }
                          if (block.type === "button") {
                            return (
                              <div
                                key={block.id}
                                style={{
                                  textAlign: block.align || "center",
                                  margin: "16px 0",
                                }}
                              >
                                <a
                                  href={block.buttonLink}
                                  style={{
                                    display: "inline-block",
                                    background: "#7c3aed",
                                    color: "#fff",
                                    padding: "10px 20px",
                                    borderRadius: 8,
                                    fontSize: 13,
                                    fontWeight: 600,
                                    textDecoration: "none",
                                  }}
                                >
                                  {block.buttonText}
                                </a>
                              </div>
                            );
                          }
                          if (block.type === "divider") {
                            return (
                              <hr
                                key={block.id}
                                style={{
                                  border: "none",
                                  borderTop: "1px solid #e2e8f0",
                                  margin: "16px 0",
                                }}
                              />
                            );
                          }
                          return null;
                        })}
                        {/* <div style={styles.previewFooter}>
                          <p
                            style={{
                              margin: "0 0 10px",
                              fontSize: 12,
                              color: "#64748b",
                            }}
                          >
                            Stay connected with us
                          </p>
                          <div style={styles.socialIcons}>
                            <div style={styles.socialIcon}>
                              <FaFacebook size={12} />
                            </div>
                            <div style={styles.socialIcon}>
                              <FaInstagram size={12} />
                            </div>
                            <div style={styles.socialIcon}>
                              <FaLinkedin size={12} />
                            </div>
                            <div style={styles.socialIcon}>
                              <FaTwitter size={12} />
                            </div>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>
                )}

                {/* WHATSAPP */}
                {activeTab === "WhatsApp Message" && (
                  <div style={styles.previewCard}>
                    <div style={styles.previewHeader}>
                      <FaWhatsapp size={16} color="#25D366" />
                      <span style={{ fontWeight: 600, fontSize: 13 }}>
                        WhatsApp Preview
                      </span>
                    </div>
                    <div style={styles.whatsappFrame}>
                      <div style={styles.waHeader}>
                        <ArrowLeft size={16} color="#fff" />
                        <div style={styles.waAvatar}></div>
                        <div>
                          <div
                            style={{
                              fontWeight: 600,
                              fontSize: 13,
                              color: "#fff",
                            }}
                          >
                            Your Company
                          </div>
                          <div style={{ fontSize: 11, color: "#d1fae5" }}>
                            online
                          </div>
                        </div>
                      </div>
                      <div style={styles.waBody}>
                        <div style={styles.waBubble}>
                          {blocks.map((block) => {
                            if (block.type === "image" && block.url) {
                              return (
                                <img
                                  key={block.id}
                                  src={block.url}
                                  alt=""
                                  style={{
                                    width: "100%",
                                    borderRadius: 8,
                                    marginBottom: 8,
                                  }}
                                />
                              );
                            }
                            if (block.type === "text") {
                              return (
                                <p
                                  key={block.id}
                                  style={{
                                    fontSize: block.fontSize || 13,
                                    whiteSpace: "pre-wrap",
                                    margin: "0 0 8px",
                                    color: block.color || "#111",
                                    backgroundColor:
                                      block.backgroundColor &&
                                      block.backgroundColor !== "transparent"
                                        ? block.backgroundColor
                                        : undefined,
                                    fontWeight: block.fontWeight || "normal",
                                    fontStyle: block.fontStyle || "normal",
                                    textAlign: block.textAlign || "left",
                                    padding:
                                      block.backgroundColor &&
                                      block.backgroundColor !== "transparent"
                                        ? "6px 8px"
                                        : undefined,
                                    borderRadius: 6,
                                  }}
                                >
                                  {block.content}
                                </p>
                              );
                            }
                            if (block.type === "button") {
                              return (
                                <div key={block.id} style={{ margin: "8px 0" }}>
                                  <a
                                    href={block.buttonLink}
                                    style={{
                                      display: "inline-block",
                                      background: "#7c3aed",
                                      color: "#fff",
                                      padding: "8px 16px",
                                      borderRadius: 6,
                                      fontSize: 13,
                                      textDecoration: "none",
                                    }}
                                  >
                                    {block.buttonText}
                                  </a>
                                </div>
                              );
                            }
                            return null;
                          })}
                          <div
                            style={{
                              textAlign: "right",
                              fontSize: 11,
                              color: "#94a3b8",
                              marginTop: 6,
                            }}
                          >
                            11:30 AM ✓✓
                          </div>
                        </div>
                      </div>
                      <div style={styles.waInput}>
                        <Smile size={18} color="#94a3b8" />
                        <span
                          style={{ flex: 1, color: "#94a3b8", fontSize: 13 }}
                        >
                          Type a message
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* SOCIAL */}
                {activeTab === "Social Media Post" && (
                  <div style={styles.previewCard}>
                    <div style={styles.previewHeader}>
                      <span style={{ fontWeight: 600, fontSize: 13 }}>
                        Social Media Preview
                      </span>
                    </div>
                    <div style={styles.socialCard}>
                      <div style={styles.socialHeader}>
                        <div style={styles.socialAvatar}></div>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: 13 }}>
                            Your Company
                          </div>
                          <div style={{ fontSize: 11, color: "#94a3b8" }}>
                            Just now · 🌐
                          </div>
                        </div>
                      </div>
                      {blocks.map((block) => {
                        if (block.type === "text") {
                          return (
                            <p
                              key={block.id}
                              style={{
                                fontSize: block.fontSize || 13,
                                padding: "8px 12px",
                                whiteSpace: "pre-wrap",
                                color: block.color || "#111",
                                backgroundColor:
                                  block.backgroundColor &&
                                  block.backgroundColor !== "transparent"
                                    ? block.backgroundColor
                                    : undefined,
                                fontWeight: block.fontWeight || "normal",
                                fontStyle: block.fontStyle || "normal",
                                textAlign: block.textAlign || "left",
                                margin: 0,
                              }}
                            >
                              {block.content}
                            </p>
                          );
                        }
                        if (block.type === "image" && block.url) {
                          return (
                            <img
                              key={block.id}
                              src={block.url}
                              alt=""
                              style={{
                                width: "100%",
                                display: "block",
                                marginTop: 8,
                              }}
                            />
                          );
                        }
                        return null;
                      })}
                      <div style={styles.socialActions}>
                        <span>👍 Like</span>
                        <span>💬 Comment</span>
                        <span>↗ Share</span>
                      </div>
                    </div>
                  </div>
                )}


              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          {/* <div style={styles.bottomBar}>
            <button
              style={styles.bottomSecondary}
              onClick={() => {
                setShowTemplates(true);
                loadTemplates();
              }}
            >
              <ArrowLeft size={16} /> Back to Templates
            </button>

            <div style={{ display: "flex", gap: 12 }}>
              <button
                style={styles.bottomSecondary}
                onClick={handleSaveDraft}
                disabled={saving || sending}
              >
                {saving ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <FileText size={16} />
                )}
                {saving ? " Saving..." : " Save Draft"}
              </button>

              <button
                style={styles.bottomPrimary}
                onClick={handleSend}
                disabled={saving || sending}
              >
                {sending ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Send size={16} />
                )}
                {sending ? " Sending..." : " Send Campaign"}
              </button>
            </div>
          </div> */}
          {/* Bottom Bar */}
<div style={styles.bottomBar}>
  <button
    style={styles.bottomSecondary}
    onClick={() => {
      setShowTemplates(true);
      loadTemplates();
    }}
  >
    <ArrowLeft size={16} /> Back to Templates
  </button>

  <div style={{ display: "flex", gap: 12 }}>
    <button
      style={styles.bottomSecondary}
      onClick={handleSaveDraft}
      disabled={saving || sending}
    >
      {saving ? (
        <Loader2 size={16} className="animate-spin" />
      ) : (
        <FileText size={16} />
      )}
      {saving ? " Saving..." : " Save"}
    </button>

    <button
      style={styles.bottomPrimary}
      onClick={handleSend}
      disabled={saving || sending}
    >
      {sending ? (
        <Loader2 size={16} className="animate-spin" />
      ) : (
        <Send size={16} />
      )}
      {sending ? " Sending..." : " Send Campaign"}
    </button>
  </div>
</div>
        </>
      )}
    </div>
  );
};

// ===================== CHANNEL ITEM =====================
const ChannelItem = ({
  icon,
  title,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  active: boolean;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    style={{
      ...styles.channelItem,
      border: active ? "2px solid #7c3aed" : "1px solid #e2e8f0",
      background: active ? "#f5f3ff" : "#fff",
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 8,
          background: active ? "#ede9fe" : "#f8fafc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </div>
      <span style={{ fontWeight: 500, fontSize: 14 }}>{title}</span>
    </div>
    <div
      style={{
        width: 18,
        height: 18,
        borderRadius: "50%",
        border: active ? "6px solid #7c3aed" : "2px solid #cbd5e1",
        background: "#fff",
      }}
    />
  </div>
);

// ===================== STYLES =====================
const styles: any = {
  page: {
    minHeight: "100vh",
    background: "#f1f5f9",
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    color: "#1e293b",
    paddingBottom: 80,
  },
  successMsg: {
    margin: "12px 24px 0",
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "10px 14px",
    background: "#ecfdf5",
    border: "1px solid #a7f3d0",
    color: "#065f46",
    borderRadius: 8,
    fontSize: 13,
    fontWeight: 500,
  },
  errorMsg: {
    margin: "12px 24px 0",
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "10px 14px",
    background: "#fef2f2",
    border: "1px solid #fecaca",
    color: "#991b1b",
    borderRadius: 8,
    fontSize: 13,
    fontWeight: 500,
  },
  dismissBtn: {
    marginLeft: "auto",
    background: "none",
    border: "none",
    color: "#991b1b",
    cursor: "pointer",
    fontSize: 12,
    textDecoration: "underline",
  },
  templateCard: {
    border: "1px solid #e2e8f0",
    borderRadius: 10,
    padding: 16,
    cursor: "pointer",
    background: "#fff",
    transition: "all 0.15s",
  },
  channelBadge: {
    fontSize: 11,
    fontWeight: 600,
    padding: "2px 8px",
    borderRadius: 20,
  },
  templateTitle: {
    margin: "0 0 6px",
    fontSize: 14,
    fontWeight: 600,
    color: "#1e293b",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  mainGrid: {
    display: "grid",
    gridTemplateColumns: "300px 1fr 340px",
    gap: 20,
    padding: "20px 24px",
    maxWidth: 1600,
    margin: "0 auto",
  },
  leftCol: { display: "flex", flexDirection: "column", gap: 16 },
  centerCol: { display: "flex", flexDirection: "column" },
  rightCol: { display: "flex", flexDirection: "column" },
  card: {
    background: "#fff",
    borderRadius: 12,
    padding: 20,
    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
    border: "1px solid #e2e8f0",
  },
  sectionTitle: { margin: "0 0 4px", fontSize: 15, fontWeight: 600 },
  sectionHint: { margin: "0 0 14px", fontSize: 12, color: "#94a3b8" },
  channelItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 12px",
    borderRadius: 10,
    marginBottom: 8,
    cursor: "pointer",
  },
  select: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 8,
    border: "1px solid #e2e8f0",
    fontSize: 13,
    background: "#fff",
    marginBottom: 4,
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 8,
    border: "1px solid #e2e8f0",
    fontSize: 13,
    marginBottom: 12,
    boxSizing: "border-box",
  },
  label: {
    display: "block",
    fontSize: 12,
    fontWeight: 500,
    color: "#475569",
    marginBottom: 6,
  },
  uploadBox: {
    border: "2px dashed #cbd5e1",
    borderRadius: 10,
    padding: "24px 16px",
    textAlign: "center",
    background: "#f8fafc",
  },
  browseBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    background: "#7c3aed",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: 8,
    fontSize: 13,
    fontWeight: 500,
    cursor: "pointer",
  },
  dateBtn: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    width: "100%",
    padding: "10px 12px",
    borderRadius: 8,
    border: "1px solid #e2e8f0",
    background: "#fff",
    fontSize: 13,
    cursor: "pointer",
    color: "#64748b",
  },
  leftActions: { display: "flex", flexDirection: "column", gap: 8 },
  secondaryBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    padding: "10px 16px",
    borderRadius: 8,
    border: "1px solid #e2e8f0",
    background: "#fff",
    fontSize: 13,
    fontWeight: 500,
    cursor: "pointer",
    color: "#475569",
  },
  primaryBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    padding: "10px 16px",
    borderRadius: 8,
    border: "none",
    background: "#7c3aed",
    color: "#fff",
    fontSize: 13,
    fontWeight: 500,
    cursor: "pointer",
  },
  tabs: {
    display: "flex",
    gap: 4,
    borderBottom: "1px solid #e2e8f0",
    marginBottom: 16,
  },
  tab: {
    padding: "8px 14px",
    border: "none",
    background: "transparent",
    fontSize: 13,
    color: "#64748b",
    cursor: "pointer",
    borderBottom: "2px solid transparent",
  },
  activeTab: {
    padding: "8px 14px",
    border: "none",
    background: "transparent",
    fontSize: 13,
    color: "#7c3aed",
    fontWeight: 600,
    cursor: "pointer",
    borderBottom: "2px solid #7c3aed",
  },
  addToolbar: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 8,
    padding: "12px 0",
    borderBottom: "1px solid #e2e8f0",
    marginBottom: 16,
  },
  addBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "6px 12px",
    borderRadius: 6,
    border: "1px solid #e2e8f0",
    background: "#f8fafc",
    fontSize: 12,
    fontWeight: 500,
    cursor: "pointer",
    color: "#475569",
  },
  canvas: {
    minHeight: 320,
    background: "#fafafa",
    border: "1px solid #e2e8f0",
    borderRadius: 10,
    padding: 16,
  },
  emptyCanvas: {
    textAlign: "center",
    padding: "60px 20px",
    color: "#94a3b8",
  },
  blockWrapper: {
    position: "relative",
    marginBottom: 16,
    padding: 12,
    background: "#fff",
    borderRadius: 8,
    border: "1px solid #e2e8f0",
  },
  blockControls: {
    position: "absolute",
    top: 8,
    right: 8,
    display: "flex",
    gap: 4,
    zIndex: 5,
  },
  controlBtn: {
    width: 26,
    height: 26,
    border: "1px solid #e2e8f0",
    borderRadius: 4,
    background: "#fff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 12,
  },
  textBlock: {
    width: "100%",
    minHeight: 80,
    padding: 12,
    border: "1px solid #e2e8f0",
    borderRadius: 6,
    fontSize: 14,
    lineHeight: 1.5,
    resize: "vertical",
    boxSizing: "border-box",
    fontFamily: "inherit",
  },
  imagePlaceholder: {
    height: 140,
    background: "#f1f5f9",
    borderRadius: 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "#94a3b8",
    gap: 8,
  },
  logoPlaceholder: {
    height: 80,
    background: "#f1f5f9",
    borderRadius: 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "#94a3b8",
    gap: 4,
  },
  previewButton: {
    background: "#7c3aed",
    color: "#fff",
    border: "none",
    padding: "10px 24px",
    borderRadius: 8,
    fontWeight: 600,
    fontSize: 14,
    cursor: "pointer",
  },
  editorFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
    paddingTop: 12,
    borderTop: "1px solid #e2e8f0",
  },
  iconOnlyBtn: {
    width: 32,
    height: 32,
    border: "1px solid #e2e8f0",
    borderRadius: 6,
    background: "#fff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  addVariable: {
    border: "none",
    background: "transparent",
    color: "#7c3aed",
    fontSize: 13,
    fontWeight: 500,
    cursor: "pointer",
  },
  previewCard: { marginBottom: 20 },
  emailComposer: { display: "flex", flexDirection: "column", gap: 12 },
  emailSectionCard: {
    border: "1px solid #e2e8f0",
    borderRadius: 10,
    padding: 12,
    background: "#f8fafc",
  },
  previewHeader: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  whatsappFrame: {
    border: "1px solid #e2e8f0",
    borderRadius: 12,
    overflow: "hidden",
    background: "#efeae2",
  },
  waHeader: {
    background: "#075e54",
    padding: "10px 12px",
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  waAvatar: {
    width: 32,
    height: 32,
    borderRadius: "50%",
    background: "#25D366",
  },
  waBody: { padding: 12, minHeight: 200 },
  waBubble: {
    background: "#fff",
    borderRadius: "8px 8px 8px 0",
    padding: 10,
    maxWidth: "95%",
    boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
  },
  waInput: {
    background: "#f0f2f5",
    padding: "8px 12px",
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  emailPreviewFrame: {
    border: "1px solid #e2e8f0",
    borderRadius: 10,
    overflow: "hidden",
    background: "#fff",
  },
  previewSubject: {
    padding: "10px 14px",
    background: "#f8fafc",
    borderBottom: "1px solid #e2e8f0",
    fontSize: 13,
    color: "#475569",
  },
  previewBody: { padding: 16 },
  previewFooter: {
    borderTop: "1px solid #f1f5f9",
    paddingTop: 16,
    marginTop: 20,
    textAlign: "center",
  },
  socialIcons: {
    display: "flex",
    justifyContent: "center",
    gap: 10,
  },
  socialIcon: {
    width: 28,
    height: 28,
    borderRadius: "50%",
    background: "#f1f5f9",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#64748b",
  },
  socialCard: {
    border: "1px solid #e2e8f0",
    borderRadius: 10,
    overflow: "hidden",
    background: "#fff",
  },
  socialHeader: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "10px 12px",
  },
  socialAvatar: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
  },
  socialActions: {
    display: "flex",
    justifyContent: "space-around",
    padding: "8px 0",
    borderTop: "1px solid #f1f5f9",
    fontSize: 12,
    color: "#64748b",
  },
  bottomBar: {
  marginTop: 24,
  background: "#fff",
  border: "1px solid #e2e8f0",
  borderRadius: 12,
  padding: "14px 20px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
},
  bottomSecondary: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "9px 18px",
    borderRadius: 8,
    border: "1px solid #e2e8f0",
    background: "#fff",
    fontSize: 13,
    fontWeight: 500,
    cursor: "pointer",
    color: "#475569",
  },
  bottomPrimary: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "9px 20px",
    borderRadius: 8,
    border: "none",
    background: "#7c3aed",
    color: "#fff",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
  },
};

export default Campaign;