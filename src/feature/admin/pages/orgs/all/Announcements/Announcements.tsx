// // import { useEffect, useState } from "react";
// // import axios from "axios";
// // import {
// //   AlertCircle,
// //   Bell,
// //   CalendarDays,
// //   CheckCircle2,
// //   ChevronRight,
// //   Image as ImageIcon,
// //   Info,
// //   Italic,
// //   Bold,
// //   AlignLeft,
// //   AlignCenter,
// //   AlignRight,
// //   Upload,
// //   X,
// //   Plus,
// //   Pencil,
// //   Trash2,
// //   RefreshCw,
// //   Sparkles,
// //   Send,
// //   TriangleAlert,
// // } from "lucide-react";

// // const API_URL = import.meta.env.VITE_BACKEND_URL;

// // type BlockType = "text" | "image";

// // type MessageBlock = {
// //   id: string;
// //   type: BlockType;

// //   text?: string;
// //   imageUrl?: string;

// //   color?: string;
// //   backgroundColor?: string;
// //   fontSize?: number;
// //   fontWeight?: "normal" | "bold";
// //   fontStyle?: "normal" | "italic";
// //   textAlign?: "left" | "center" | "right";
// //   fontFamily?: string;
// // };

// // type Announcement = {
// //   id: number;
// //   title: string;

// //   message?: string;
// //   description?: string;
// //   announcement?: string;

// //   priority?: string;

// //   publishedAt?: string;
// //   published_at?: string;
// //   createdAt?: string;
// //   created_at?: string;

// //   expiresAt?: string;
// //   expires_at?: string;
// //   expiryDate?: string;
// //   expiry_date?: string;

// //   organisation_id?: number;
// //   created_by?: number;
// //   is_active?: boolean;
// // };

// // type AnnouncementForm = {
// //   title: string;
// //   message: string;
// //   priority: string;
// //   expiresAt: string;
// // };

// // type PopupType = "success" | "error" | "warning" | "info" | "confirm";

// // type PopupState = {
// //   open: boolean;
// //   type: PopupType;
// //   title: string;
// //   message: string;
// //   confirmText?: string;
// //   cancelText?: string;
// //   onConfirm?: () => void;
// // };

// // const EMOJIS = [
// //   "😀",
// //   "😊",
// //   "🎉",
// //   "📢",
// //   "🔔",
// //   "⚠️",
// //   "✅",
// //   "❌",
// //   "⭐",
// //   "❤️",
// //   "🏠",
// //   "🎁",
// //   "📅",
// //   "📌",
// //   "🚨",
// //   "🙏",
// // ];

// // const FONT_FAMILIES = [
// //   "Arial",
// //   "Georgia",
// //   "Times New Roman",
// //   "Verdana",
// //   "Trebuchet MS",
// //   "Courier New",
// // ];

// // const FONT_SIZES = [12, 14, 16, 18, 20, 24, 28, 32];

// // const createTextBlock = (): MessageBlock => ({
// //   id: `text-${Date.now()}-${Math.random()}`,
// //   type: "text",
// //   text: "",
// //   color: "#1e293b",
// //   backgroundColor: "transparent",
// //   fontSize: 16,
// //   fontWeight: "normal",
// //   fontStyle: "normal",
// //   textAlign: "left",
// //   fontFamily: "Arial",
// // });

// // const createImageBlock = (imageUrl = ""): MessageBlock => ({
// //   id: `image-${Date.now()}-${Math.random()}`,
// //   type: "image",
// //   imageUrl,
// // });

// // const parseMessageBlocks = (message?: string): MessageBlock[] => {
// //   if (!message) {
// //     return [];
// //   }

// //   try {
// //     const parsed = JSON.parse(message);

// //     if (Array.isArray(parsed)) {
// //       return parsed;
// //     }

// //     if (parsed?.blocks && Array.isArray(parsed.blocks)) {
// //       return parsed.blocks;
// //     }

// //     if (parsed?.content && Array.isArray(parsed.content)) {
// //       return parsed.content;
// //     }
// //   } catch {
// //     // Normal text message
// //   }

// //   return [
// //     {
// //       ...createTextBlock(),
// //       text: message,
// //     },
// //   ];
// // };

// // const getMessage = (announcement: Announcement): string => {
// //   return (
// //     announcement.message ||
// //     announcement.description ||
// //     announcement.announcement ||
// //     ""
// //   );
// // };

// // const getPublishedDate = (announcement: Announcement): string => {
// //   return (
// //     announcement.publishedAt ||
// //     announcement.published_at ||
// //     announcement.createdAt ||
// //     announcement.created_at ||
// //     ""
// //   );
// // };

// // const getExpiryDate = (announcement: Announcement): string => {
// //   return (
// //     announcement.expiresAt ||
// //     announcement.expires_at ||
// //     announcement.expiryDate ||
// //     announcement.expiry_date ||
// //     ""
// //   );
// // };

// // const formatDate = (value?: string) => {
// //   if (!value) return "-";

// //   const date = new Date(value);

// //   if (Number.isNaN(date.getTime())) {
// //     return value;
// //   }

// //   return date.toLocaleDateString("en-IN", {
// //     day: "2-digit",
// //     month: "short",
// //     year: "numeric",
// //   });
// // };

// // const getDateInputValue = (value?: string) => {
// //   if (!value) return "";

// //   const date = new Date(value);

// //   if (Number.isNaN(date.getTime())) {
// //     return value.substring(0, 10);
// //   }

// //   const year = date.getFullYear();
// //   const month = String(date.getMonth() + 1).padStart(2, "0");
// //   const day = String(date.getDate()).padStart(2, "0");

// //   return `${year}-${month}-${day}`;
// // };

// // const getTodayInputValue = () => {
// //   const today = new Date();

// //   const year = today.getFullYear();
// //   const month = String(today.getMonth() + 1).padStart(2, "0");
// //   const day = String(today.getDate()).padStart(2, "0");

// //   return `${year}-${month}-${day}`;
// // };

// // const getPriorityStyles = (priority?: string) => {
// //   switch ((priority || "").toLowerCase()) {
// //     case "important":
// //       return {
// //         bg: "bg-red-50",
// //         text: "text-red-600",
// //         border: "border-red-100",
// //       };

// //     case "urgent":
// //       return {
// //         bg: "bg-orange-50",
// //         text: "text-orange-600",
// //         border: "border-orange-100",
// //       };

// //     case "general":
// //       return {
// //         bg: "bg-slate-50",
// //         text: "text-slate-600",
// //         border: "border-slate-100",
// //       };

// //     default:
// //       return {
// //         bg: "bg-blue-50",
// //         text: "text-blue-600",
// //         border: "border-blue-100",
// //       };
// //   }
// // };

// // const getApiResponseMessage = (
// //   data: any,
// //   fallback: string
// // ): string => {
// //   if (!data) {
// //     return fallback;
// //   }

// //   if (typeof data === "string") {
// //     return data;
// //   }

// //   if (data.message) {
// //     return String(data.message);
// //   }

// //   if (data.msg) {
// //     return String(data.msg);
// //   }

// //   if (data.error) {
// //     return String(data.error);
// //   }

// //   if (data.data?.message) {
// //     return String(data.data.message);
// //   }

// //   try {
// //     return JSON.stringify(data);
// //   } catch {
// //     return fallback;
// //   }
// // };

// // /* -------------------------------------------------------------------------- */
// // /* POPUP                                                                      */
// // /* -------------------------------------------------------------------------- */

// // type PopupModalProps = {
// //   popup: PopupState;
// //   onClose: () => void;
// // };

// // const PopupModal = ({ popup, onClose }: PopupModalProps) => {
// //   if (!popup.open) return null;

// //   const config = {
// //     success: {
// //       icon: CheckCircle2,
// //       iconBg: "bg-emerald-100",
// //       iconColor: "text-emerald-600",
// //       button: "bg-emerald-600 hover:bg-emerald-700",
// //     },
// //     error: {
// //       icon: AlertCircle,
// //       iconBg: "bg-red-100",
// //       iconColor: "text-red-600",
// //       button: "bg-red-600 hover:bg-red-700",
// //     },
// //     warning: {
// //       icon: TriangleAlert,
// //       iconBg: "bg-amber-100",
// //       iconColor: "text-amber-600",
// //       button: "bg-amber-600 hover:bg-amber-700",
// //     },
// //     info: {
// //       icon: Info,
// //       iconBg: "bg-blue-100",
// //       iconColor: "text-blue-600",
// //       button: "bg-blue-600 hover:bg-blue-700",
// //     },
// //     confirm: {
// //       icon: TriangleAlert,
// //       iconBg: "bg-amber-100",
// //       iconColor: "text-amber-600",
// //       button: "bg-red-600 hover:bg-red-700",
// //     },
// //   }[popup.type];

// //   const Icon = config.icon;

// //   const handleConfirm = () => {
// //     const callback = popup.onConfirm;

// //     onClose();

// //     if (callback) {
// //       setTimeout(() => {
// //         callback();
// //       }, 100);
// //     }
// //   };

// //   return (
// //     <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm">
// //       <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
// //         <div className="p-5">
// //           <div className="flex items-start gap-3">
// //             <div
// //               className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${config.iconBg}`}
// //             >
// //               <Icon className={`h-5 w-5 ${config.iconColor}`} />
// //             </div>

// //             <div className="min-w-0 flex-1">
// //               <h3 className="text-base font-semibold text-slate-800">
// //                 {popup.title}
// //               </h3>

// //               <p className="mt-1.5 whitespace-pre-wrap break-words text-sm leading-5 text-slate-600">
// //                 {popup.message}
// //               </p>
// //             </div>

// //             <button
// //               type="button"
// //               onClick={onClose}
// //               className="rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
// //             >
// //               <X className="h-4 w-4" />
// //             </button>
// //           </div>
// //         </div>

// //         <div className="flex justify-end gap-2 border-t border-slate-100 bg-slate-50 px-5 py-3">
// //           {popup.type === "confirm" && (
// //             <button
// //               type="button"
// //               onClick={onClose}
// //               className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-100"
// //             >
// //               {popup.cancelText || "Cancel"}
// //             </button>
// //           )}

// //           <button
// //             type="button"
// //             onClick={
// //               popup.type === "confirm"
// //                 ? handleConfirm
// //                 : onClose
// //             }
// //             className={`rounded-lg px-4 py-2 text-xs font-semibold text-white transition ${config.button}`}
// //           >
// //             {popup.type === "confirm"
// //               ? popup.confirmText || "Confirm"
// //               : "OK"}
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // /* -------------------------------------------------------------------------- */
// // /* IMAGE UPLOAD                                                               */
// // /* -------------------------------------------------------------------------- */

// // const uploadImageFile = async (file: File): Promise<string> => {
// //   if (!file.type.startsWith("image/")) {
// //     throw new Error("Please select a valid image file.");
// //   }

// //   if (file.size > 8 * 1024 * 1024) {
// //     throw new Error("Image size must be less than 8 MB.");
// //   }

// //   const formData = new FormData();
// //   formData.append("image", file);

// //   const response = await axios.post(
// //     `${API_URL}/api/upload/image`,
// //     formData,
// //     {
// //       withCredentials: true,
// //       headers: {
// //         "Content-Type": "multipart/form-data",
// //       },
// //     }
// //   );

// //   return (
// //     response.data?.url ||
// //     response.data?.imageUrl ||
// //     response.data?.path ||
// //     response.data?.data?.url ||
// //     ""
// //   );
// // };

// // /* -------------------------------------------------------------------------- */
// // /* EMOJI PICKER                                                               */
// // /* -------------------------------------------------------------------------- */

// // type EmojiPickerProps = {
// //   onSelect: (emoji: string) => void;
// // };

// // const EmojiPicker = ({ onSelect }: EmojiPickerProps) => {
// //   return (
// //     <div className="absolute left-0 top-full z-50 mt-1 w-52 rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
// //       <div className="grid grid-cols-8 gap-1">
// //         {EMOJIS.map((emoji) => (
// //           <button
// //             key={emoji}
// //             type="button"
// //             onClick={() => onSelect(emoji)}
// //             className="flex h-7 w-7 items-center justify-center rounded-md text-base transition hover:bg-slate-100"
// //           >
// //             {emoji}
// //           </button>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // /* -------------------------------------------------------------------------- */
// // /* TEXT BLOCK EDITOR                                                          */
// // /* -------------------------------------------------------------------------- */

// // type TextBlockEditorProps = {
// //   block: MessageBlock;
// //   onChange: (block: MessageBlock) => void;
// //   onRemove: () => void;
// // };

// // const TextBlockEditor = ({
// //   block,
// //   onChange,
// //   onRemove,
// // }: TextBlockEditorProps) => {
// //   const [showEmoji, setShowEmoji] = useState(false);

// //   const update = (changes: Partial<MessageBlock>) => {
// //     onChange({
// //       ...block,
// //       ...changes,
// //     });
// //   };

// //   return (
// //     <div className="rounded-xl border border-slate-200 bg-white p-3">
// //       <div className="mb-2 flex items-center justify-between">
// //         <span className="text-xs font-semibold text-slate-600">
// //           Text
// //         </span>

// //         <button
// //           type="button"
// //           onClick={onRemove}
// //           className="rounded-md p-1 text-slate-400 hover:bg-red-50 hover:text-red-500"
// //         >
// //           <X className="h-4 w-4" />
// //         </button>
// //       </div>

// //       <textarea
// //         value={block.text || ""}
// //         onChange={(e) => update({ text: e.target.value })}
// //         placeholder="Write announcement message..."
// //         rows={4}
// //         className="w-full resize-none rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
// //       />

// //       <div className="mt-2 flex flex-wrap items-center gap-1.5">
// //         <select
// //           value={block.fontFamily || "Arial"}
// //           onChange={(e) =>
// //             update({
// //               fontFamily: e.target.value,
// //             })
// //           }
// //           className="h-8 rounded-md border border-slate-200 bg-white px-2 text-[11px] text-slate-600 outline-none"
// //         >
// //           {FONT_FAMILIES.map((font) => (
// //             <option key={font} value={font}>
// //               {font}
// //             </option>
// //           ))}
// //         </select>

// //         <select
// //           value={block.fontSize || 16}
// //           onChange={(e) =>
// //             update({
// //               fontSize: Number(e.target.value),
// //             })
// //           }
// //           className="h-8 rounded-md border border-slate-200 bg-white px-2 text-[11px] text-slate-600 outline-none"
// //         >
// //           {FONT_SIZES.map((size) => (
// //             <option key={size} value={size}>
// //               {size}px
// //             </option>
// //           ))}
// //         </select>

// //         <button
// //           type="button"
// //           onClick={() =>
// //             update({
// //               fontWeight:
// //                 block.fontWeight === "bold"
// //                   ? "normal"
// //                   : "bold",
// //             })
// //           }
// //           className={`flex h-8 w-8 items-center justify-center rounded-md border ${
// //             block.fontWeight === "bold"
// //               ? "border-blue-200 bg-blue-50 text-blue-600"
// //               : "border-slate-200 text-slate-500"
// //           }`}
// //         >
// //           <Bold className="h-3.5 w-3.5" />
// //         </button>

// //         <button
// //           type="button"
// //           onClick={() =>
// //             update({
// //               fontStyle:
// //                 block.fontStyle === "italic"
// //                   ? "normal"
// //                   : "italic",
// //             })
// //           }
// //           className={`flex h-8 w-8 items-center justify-center rounded-md border ${
// //             block.fontStyle === "italic"
// //               ? "border-blue-200 bg-blue-50 text-blue-600"
// //               : "border-slate-200 text-slate-500"
// //           }`}
// //         >
// //           <Italic className="h-3.5 w-3.5" />
// //         </button>

// //         <button
// //           type="button"
// //           onClick={() => update({ textAlign: "left" })}
// //           className={`flex h-8 w-8 items-center justify-center rounded-md border ${
// //             block.textAlign === "left"
// //               ? "border-blue-200 bg-blue-50 text-blue-600"
// //               : "border-slate-200 text-slate-500"
// //           }`}
// //         >
// //           <AlignLeft className="h-3.5 w-3.5" />
// //         </button>

// //         <button
// //           type="button"
// //           onClick={() => update({ textAlign: "center" })}
// //           className={`flex h-8 w-8 items-center justify-center rounded-md border ${
// //             block.textAlign === "center"
// //               ? "border-blue-200 bg-blue-50 text-blue-600"
// //               : "border-slate-200 text-slate-500"
// //           }`}
// //         >
// //           <AlignCenter className="h-3.5 w-3.5" />
// //         </button>

// //         <button
// //           type="button"
// //           onClick={() => update({ textAlign: "right" })}
// //           className={`flex h-8 w-8 items-center justify-center rounded-md border ${
// //             block.textAlign === "right"
// //               ? "border-blue-200 bg-blue-50 text-blue-600"
// //               : "border-slate-200 text-slate-500"
// //           }`}
// //         >
// //           <AlignRight className="h-3.5 w-3.5" />
// //         </button>

// //         <div className="relative">
// //           <button
// //             type="button"
// //             onClick={() => setShowEmoji((prev) => !prev)}
// //             className="flex h-8 items-center gap-1 rounded-md border border-slate-200 px-2 text-xs text-slate-500 hover:bg-slate-50"
// //           >
// //             😊
// //           </button>

// //           {showEmoji && (
// //             <EmojiPicker
// //               onSelect={(emoji) => {
// //                 update({
// //                   text: `${block.text || ""}${emoji}`,
// //                 });
// //                 setShowEmoji(false);
// //               }}
// //             />
// //           )}
// //         </div>

// //         <label className="flex h-8 cursor-pointer items-center gap-1 rounded-md border border-slate-200 px-2 text-xs text-slate-500 hover:bg-slate-50">
// //           <span
// //             className="h-4 w-4 rounded border border-slate-200"
// //             style={{
// //               backgroundColor:
// //                 block.color || "#1e293b",
// //             }}
// //           />
// //           <input
// //             type="color"
// //             value={block.color || "#1e293b"}
// //             onChange={(e) =>
// //               update({
// //                 color: e.target.value,
// //               })
// //             }
// //             className="absolute h-0 w-0 opacity-0"
// //           />
// //         </label>
// //       </div>
// //     </div>
// //   );
// // };

// // /* -------------------------------------------------------------------------- */
// // /* IMAGE BLOCK EDITOR                                                         */
// // /* -------------------------------------------------------------------------- */

// // type ImageBlockEditorProps = {
// //   block: MessageBlock;
// //   onChange: (block: MessageBlock) => void;
// //   onRemove: () => void;
// // };

// // const ImageBlockEditor = ({
// //   block,
// //   onChange,
// //   onRemove,
// // }: ImageBlockEditorProps) => {
// //   const [uploading, setUploading] = useState(false);

// //   const handleFile = async (file?: File) => {
// //     if (!file) return;

// //     try {
// //       setUploading(true);

// //       const url = await uploadImageFile(file);

// //       if (!url) {
// //         throw new Error("Image URL was not returned by the server.");
// //       }

// //       onChange({
// //         ...block,
// //         imageUrl: url,
// //       });
// //     } catch (error: any) {
// //       window.dispatchEvent(
// //         new CustomEvent("announcement-upload-error", {
// //           detail:
// //             error?.response?.data?.message ||
// //             error?.message ||
// //             "Unable to upload image.",
// //         })
// //       );
// //     } finally {
// //       setUploading(false);
// //     }
// //   };

// //   return (
// //     <div className="rounded-xl border border-slate-200 bg-white p-3">
// //       <div className="mb-2 flex items-center justify-between">
// //         <span className="text-xs font-semibold text-slate-600">
// //           Image / Banner
// //         </span>

// //         <button
// //           type="button"
// //           onClick={onRemove}
// //           className="rounded-md p-1 text-slate-400 hover:bg-red-50 hover:text-red-500"
// //         >
// //           <X className="h-4 w-4" />
// //         </button>
// //       </div>

// //       {block.imageUrl ? (
// //         <div className="relative overflow-hidden rounded-lg border border-slate-200">
// //           <img
// //             src={block.imageUrl}
// //             alt="Announcement"
// //             className="max-h-52 w-full object-contain"
// //           />

// //           <label className="absolute bottom-2 right-2 flex cursor-pointer items-center gap-1 rounded-lg bg-white/95 px-2.5 py-1.5 text-xs font-medium text-slate-600 shadow">
// //             <Upload className="h-3.5 w-3.5" />
// //             Replace
// //             <input
// //               type="file"
// //               accept="image/png,image/jpeg,image/gif,image/webp"
// //               className="hidden"
// //               onChange={(e) =>
// //                 handleFile(e.target.files?.[0])
// //               }
// //             />
// //           </label>
// //         </div>
// //       ) : (
// //         <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center transition hover:bg-slate-100">
// //           {uploading ? (
// //             <>
// //               <RefreshCw className="h-6 w-6 animate-spin text-blue-500" />
// //               <p className="mt-2 text-xs text-slate-500">
// //                 Uploading...
// //               </p>
// //             </>
// //           ) : (
// //             <>
// //               <ImageIcon className="h-7 w-7 text-slate-400" />
// //               <p className="mt-2 text-xs font-medium text-slate-600">
// //                 Click to upload image
// //               </p>
// //               <p className="mt-1 text-[10px] text-slate-400">
// //                 PNG, JPG, GIF or WebP • Max 8 MB
// //               </p>
// //             </>
// //           )}

// //           <input
// //             type="file"
// //             accept="image/png,image/jpeg,image/gif,image/webp"
// //             className="hidden"
// //             onChange={(e) =>
// //               handleFile(e.target.files?.[0])
// //             }
// //           />
// //         </label>
// //       )}
// //     </div>
// //   );
// // };

// // /* -------------------------------------------------------------------------- */
// // /* MESSAGE EDITOR                                                             */
// // /* -------------------------------------------------------------------------- */

// // type MessageEditorProps = {
// //   blocks: MessageBlock[];
// //   onChange: (blocks: MessageBlock[]) => void;
// // };

// // const MessageEditor = ({
// //   blocks,
// //   onChange,
// // }: MessageEditorProps) => {
// //   const updateBlock = (
// //     index: number,
// //     block: MessageBlock
// //   ) => {
// //     const next = [...blocks];
// //     next[index] = block;
// //     onChange(next);
// //   };

// //   const removeBlock = (index: number) => {
// //     onChange(blocks.filter((_, i) => i !== index));
// //   };

// //   const addTextBlock = () => {
// //     onChange([...blocks, createTextBlock()]);
// //   };

// //   const addImageBlock = () => {
// //     onChange([...blocks, createImageBlock()]);
// //   };

// //   return (
// //     <div className="space-y-2">
// //       {blocks.length === 0 && (
// //         <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-7 text-center">
// //           <Sparkles className="mx-auto h-7 w-7 text-slate-300" />

// //           <p className="mt-2 text-sm font-medium text-slate-500">
// //             Start creating your announcement
// //           </p>

// //           <p className="mt-1 text-xs text-slate-400">
// //             Add text, formatting or an image/banner.
// //           </p>
// //         </div>
// //       )}

// //       {blocks.map((block, index) =>
// //         block.type === "image" ? (
// //           <ImageBlockEditor
// //             key={block.id}
// //             block={block}
// //             onChange={(updated) =>
// //               updateBlock(index, updated)
// //             }
// //             onRemove={() => removeBlock(index)}
// //           />
// //         ) : (
// //           <TextBlockEditor
// //             key={block.id}
// //             block={block}
// //             onChange={(updated) =>
// //               updateBlock(index, updated)
// //             }
// //             onRemove={() => removeBlock(index)}
// //           />
// //         )
// //       )}

// //       <div className="flex flex-wrap gap-2 pt-1">
// //         <button
// //           type="button"
// //           onClick={addTextBlock}
// //           className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-50"
// //         >
// //           <Plus className="h-3.5 w-3.5" />
// //           Add Text
// //         </button>

// //         <button
// //           type="button"
// //           onClick={addImageBlock}
// //           className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-50"
// //         >
// //           <ImageIcon className="h-3.5 w-3.5" />
// //           Add Image
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // /* -------------------------------------------------------------------------- */
// // /* MESSAGE RENDERER                                                           */
// // /* -------------------------------------------------------------------------- */

// // type MessageRendererProps = {
// //   blocks: MessageBlock[];
// //   compact?: boolean;
// // };

// // const MessageRenderer = ({
// //   blocks,
// //   compact = false,
// // }: MessageRendererProps) => {
// //   if (!blocks.length) {
// //     return (
// //       <span className="text-slate-400">
// //         No message available
// //       </span>
// //     );
// //   }

// //   return (
// //     <div className={compact ? "space-y-1.5" : "space-y-3"}>
// //       {blocks.map((block) => {
// //         if (block.type === "image" && block.imageUrl) {
// //           return (
// //             <img
// //               key={block.id}
// //               src={block.imageUrl}
// //               alt="Announcement"
// //               className={
// //                 compact
// //                   ? "max-h-28 w-full rounded-lg object-cover"
// //                   : "max-h-80 w-full rounded-xl object-contain"
// //               }
// //             />
// //           );
// //         }

// //         if (block.type === "text") {
// //           const fontSize = compact
// //             ? Math.min(Number(block.fontSize || 16), 14)
// //             : Number(block.fontSize || 16);

// //           return (
// //             <div
// //               key={block.id}
// //               className="whitespace-pre-wrap break-words"
// //               style={{
// //                 color: block.color || "#1e293b",
// //                 backgroundColor:
// //                   block.backgroundColor &&
// //                   block.backgroundColor !== "transparent"
// //                     ? block.backgroundColor
// //                     : undefined,
// //                 fontSize,
// //                 fontWeight:
// //                   block.fontWeight || "normal",
// //                 fontStyle:
// //                   block.fontStyle || "normal",
// //                 textAlign:
// //                   block.textAlign || "left",
// //                 fontFamily:
// //                   block.fontFamily || "Arial",
// //                 lineHeight: compact ? 1.45 : 1.6,
// //               }}
// //             >
// //               {block.text}
// //             </div>
// //           );
// //         }

// //         return null;
// //       })}
// //     </div>
// //   );
// // };

// // /* -------------------------------------------------------------------------- */
// // /* MAIN COMPONENT                                                             */
// // /* -------------------------------------------------------------------------- */

// // export default function Announcements() {
// //   const [announcements, setAnnouncements] = useState<
// //     Announcement[]
// //   >([]);

// //   const [loading, setLoading] = useState(true);
// //   const [refreshing, setRefreshing] = useState(false);

// //   const [selectedAnnouncement, setSelectedAnnouncement] =
// //     useState<Announcement | null>(null);

// //   const [showCreateModal, setShowCreateModal] =
// //     useState(false);

// //   const [editingAnnouncement, setEditingAnnouncement] =
// //     useState<Announcement | null>(null);

// //   const [form, setForm] = useState<AnnouncementForm>({
// //     title: "",
// //     message: "",
// //     priority: "Notice",
// //     expiresAt: "",
// //   });

// //   const [messageBlocks, setMessageBlocks] = useState<
// //     MessageBlock[]
// //   >([]);

// //   const [saving, setSaving] = useState(false);
// //   const [deletingId, setDeletingId] = useState<number | null>(
// //     null
// //   );

// //   const [error, setError] = useState("");

// //   const [popup, setPopup] = useState<PopupState>({
// //     open: false,
// //     type: "info",
// //     title: "",
// //     message: "",
// //   });

// //   /* ------------------------------------------------------------------------ */
// //   /* POPUP HELPERS                                                            */
// //   /* ------------------------------------------------------------------------ */

// //   const showPopup = (
// //     type: PopupType,
// //     title: string,
// //     message: string,
// //     options?: {
// //       confirmText?: string;
// //       cancelText?: string;
// //       onConfirm?: () => void;
// //     }
// //   ) => {
// //     setPopup({
// //       open: true,
// //       type,
// //       title,
// //       message,
// //       confirmText: options?.confirmText,
// //       cancelText: options?.cancelText,
// //       onConfirm: options?.onConfirm,
// //     });
// //   };

// //   const closePopup = () => {
// //     setPopup((prev) => ({
// //       ...prev,
// //       open: false,
// //     }));
// //   };

// //   /* ------------------------------------------------------------------------ */
// //   /* FETCH                                                                    */
// //   /* ------------------------------------------------------------------------ */

// //   const fetchAnnouncements = async (
// //     showErrorPopup = false
// //   ) => {
// //     try {
// //       setError("");

// //       const response = await axios.get(
// //         `${API_URL}/api/admin/announcements`,
// //         {
// //           withCredentials: true,
// //         }
// //       );

// //       const data = response.data;

// //       const list =
// //         Array.isArray(data)
// //           ? data
// //           : Array.isArray(data?.announcements)
// //           ? data.announcements
// //           : Array.isArray(data?.data)
// //           ? data.data
// //           : [];

// //       setAnnouncements(list);
// //     } catch (err: any) {
// //       const message = getApiResponseMessage(
// //         err?.response?.data,
// //         err?.message || "Unable to fetch announcements."
// //       );

// //       setError(message);

// //       if (showErrorPopup) {
// //         showPopup(
// //           "error",
// //           "API Response",
// //           message
// //         );
// //       }
// //     }
// //   };

// //   useEffect(() => {
// //     const load = async () => {
// //       setLoading(true);

// //       await fetchAnnouncements(true);

// //       setLoading(false);
// //     };

// //     load();
// //   }, []);

// //   /* ------------------------------------------------------------------------ */
// //   /* CREATE                                                                    */
// //   /* ------------------------------------------------------------------------ */

// //   const openCreateModal = () => {
// //     setEditingAnnouncement(null);

// //     setForm({
// //       title: "",
// //       message: "",
// //       priority: "Notice",
// //       expiresAt: "",
// //     });

// //     setMessageBlocks([
// //       createTextBlock(),
// //     ]);

// //     setShowCreateModal(true);
// //   };

// //   /* ------------------------------------------------------------------------ */
// //   /* EDIT                                                                      */
// //   /* ------------------------------------------------------------------------ */

// //   const openEditModal = (
// //     announcement: Announcement
// //   ) => {
// //     setEditingAnnouncement(announcement);

// //     setForm({
// //       title: announcement.title || "",
// //       message: getMessage(announcement),
// //       priority: announcement.priority || "Notice",
// //       expiresAt: getDateInputValue(
// //         getExpiryDate(announcement)
// //       ),
// //     });

// //     setMessageBlocks(
// //       parseMessageBlocks(getMessage(announcement))
// //     );

// //     setShowCreateModal(true);
// //   };

// //   const closeFormModal = () => {
// //     if (saving) return;

// //     setShowCreateModal(false);
// //     setEditingAnnouncement(null);
// //   };

// //   /* ------------------------------------------------------------------------ */
// //   /* MESSAGE BLOCKS                                                            */
// //   /* ------------------------------------------------------------------------ */

// //   const updateMessageBlocks = (
// //     blocks: MessageBlock[]
// //   ) => {
// //     setMessageBlocks(blocks);

// //     setForm((prev) => ({
// //       ...prev,
// //       message: JSON.stringify(blocks),
// //     }));
// //   };

// //   const hasMessageContent = () => {
// //     return messageBlocks.some((block) => {
// //       if (block.type === "image") {
// //         return Boolean(block.imageUrl);
// //       }

// //       return Boolean(block.text?.trim());
// //     });
// //   };

// //   /* ------------------------------------------------------------------------ */
// //   /* SUBMIT                                                                    */
// //   /* ------------------------------------------------------------------------ */

// //   const handleSubmit = async (
// //     e: React.FormEvent
// //   ) => {
// //     e.preventDefault();

// //     if (!form.title.trim()) {
// //       showPopup(
// //         "warning",
// //         "Validation",
// //         "Please enter an announcement title."
// //       );
// //       return;
// //     }

// //     if (!hasMessageContent()) {
// //       showPopup(
// //         "warning",
// //         "Validation",
// //         "Please enter an announcement message or add an image."
// //       );
// //       return;
// //     }

// //     if (!form.expiresAt) {
// //       showPopup(
// //         "warning",
// //         "Validation",
// //         "Please select an expiry date."
// //       );
// //       return;
// //     }

// //     const today = getTodayInputValue();

// //     if (form.expiresAt < today) {
// //       showPopup(
// //         "warning",
// //         "Invalid Expiry Date",
// //         "Expiry date cannot be earlier than today."
// //       );
// //       return;
// //     }

// //     try {
// //       setSaving(true);

// //       const payload = {
// //         title: form.title.trim(),
// //         message: JSON.stringify(messageBlocks),
// //         priority: form.priority,
// //         expiresAt: form.expiresAt,
// //       };

// //       let response;

// //       if (editingAnnouncement) {
// //         response = await axios.put(
// //           `${API_URL}/api/admin/announcements/${editingAnnouncement.id}`,
// //           payload,
// //           {
// //             withCredentials: true,
// //           }
// //         );
// //       } else {
// //         response = await axios.post(
// //           `${API_URL}/api/admin/announcements`,
// //           payload,
// //           {
// //             withCredentials: true,
// //           }
// //         );
// //       }

// //       const apiMessage = getApiResponseMessage(
// //         response.data,
// //         editingAnnouncement
// //           ? "Announcement updated successfully."
// //           : "Announcement created successfully."
// //       );

// //       setShowCreateModal(false);
// //       setEditingAnnouncement(null);

// //       await fetchAnnouncements(false);

// //       showPopup(
// //         "success",
// //         editingAnnouncement
// //           ? "Announcement Updated"
// //           : "Announcement Created",
// //         apiMessage
// //       );
// //     } catch (err: any) {
// //       const apiMessage = getApiResponseMessage(
// //         err?.response?.data,
// //         err?.message ||
// //           (editingAnnouncement
// //             ? "Unable to update announcement."
// //             : "Unable to create announcement.")
// //       );

// //       showPopup(
// //         "error",
// //         "API Response",
// //         apiMessage
// //       );
// //     } finally {
// //       setSaving(false);
// //     }
// //   };

// //   /* ------------------------------------------------------------------------ */
// //   /* DELETE                                                                    */
// //   /* ------------------------------------------------------------------------ */

// //   const performDelete = async (id: number) => {
// //     try {
// //       setDeletingId(id);

// //       const response = await axios.delete(
// //         `${API_URL}/api/admin/announcements/${id}`,
// //         {
// //           withCredentials: true,
// //         }
// //       );

// //       const apiMessage = getApiResponseMessage(
// //         response.data,
// //         "Announcement deleted successfully."
// //       );

// //       setAnnouncements((prev) =>
// //         prev.filter((item) => item.id !== id)
// //       );

// //       if (selectedAnnouncement?.id === id) {
// //         setSelectedAnnouncement(null);
// //       }

// //       showPopup(
// //         "success",
// //         "Announcement Deleted",
// //         apiMessage
// //       );
// //     } catch (err: any) {
// //       const apiMessage = getApiResponseMessage(
// //         err?.response?.data,
// //         err?.message ||
// //           "Unable to delete announcement."
// //       );

// //       showPopup(
// //         "error",
// //         "API Response",
// //         apiMessage
// //       );
// //     } finally {
// //       setDeletingId(null);
// //     }
// //   };

// //   const handleDelete = (
// //     announcement: Announcement
// //   ) => {
// //     showPopup(
// //       "confirm",
// //       "Delete Announcement",
// //       `Are you sure you want to delete "${announcement.title}"?`,
// //       {
// //         confirmText: "Delete",
// //         cancelText: "Cancel",
// //         onConfirm: () =>
// //           performDelete(announcement.id),
// //       }
// //     );
// //   };

// //   /* ------------------------------------------------------------------------ */
// //   /* REFRESH                                                                   */
// //   /* ------------------------------------------------------------------------ */

// //   const handleRefresh = async () => {
// //     try {
// //       setRefreshing(true);
// //       await fetchAnnouncements(true);
// //     } finally {
// //       setRefreshing(false);
// //     }
// //   };

// //   /* ------------------------------------------------------------------------ */
// //   /* UPLOAD ERROR EVENT                                                        */
// //   /* ------------------------------------------------------------------------ */

// //   useEffect(() => {
// //     const handler = (event: Event) => {
// //       const customEvent = event as CustomEvent;

// //       showPopup(
// //         "error",
// //         "Image Upload",
// //         customEvent.detail ||
// //           "Unable to upload image."
// //       );
// //     };

// //     window.addEventListener(
// //       "announcement-upload-error",
// //       handler
// //     );

// //     return () => {
// //       window.removeEventListener(
// //         "announcement-upload-error",
// //         handler
// //       );
// //     };
// //   }, []);

// //   /* ------------------------------------------------------------------------ */
// //   /* RENDER                                                                    */
// //   /* ------------------------------------------------------------------------ */

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 sm:p-6">
// //       <div className="mx-auto max-w-[1450px]">
// //         {/* PAGE HEADER */}
// //         <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
// //           <div>
// //             <div className="flex items-center gap-2">
// //               <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 shadow-sm">
// //                 <Bell className="h-4.5 w-4.5 text-white" />
// //               </div>

// //               <div>
// //                 <h1 className="text-xl font-bold tracking-tight text-slate-800">
// //                   Announcements
// //                 </h1>

// //                 <p className="text-xs text-slate-500">
// //                   Create and manage announcements for your apartment members
// //                 </p>
// //               </div>
// //             </div>
// //           </div>

// //           <button
// //             type="button"
// //             onClick={openCreateModal}
// //             className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700"
// //           >
// //             <Plus className="h-4 w-4" />
// //             Create Announcement
// //           </button>
// //         </div>

// //         {/* MAIN CARD */}
// //         <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-sm backdrop-blur-sm sm:p-5">
// //           <div className="mb-4 flex items-center justify-between">
// //             <div>
// //               <div className="flex items-center gap-2">
// //                 <h2 className="text-sm font-semibold text-slate-800">
// //                   Published Announcements
// //                 </h2>

// //                 <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-600">
// //                   {announcements.length}
// //                 </span>
// //               </div>

// //               <p className="mt-0.5 text-[11px] text-slate-400">
// //                 Manage announcements sent to apartment members
// //               </p>
// //             </div>

// //             <button
// //               type="button"
// //               onClick={handleRefresh}
// //               disabled={refreshing}
// //               className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 disabled:opacity-50"
// //               title="Refresh"
// //             >
// //               <RefreshCw
// //                 className={`h-3.5 w-3.5 ${
// //                   refreshing ? "animate-spin" : ""
// //                 }`}
// //               />
// //             </button>
// //           </div>

// //           {error && !loading && (
// //             <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-xs text-red-600">
// //               <AlertCircle className="h-4 w-4 shrink-0" />
// //               <span className="truncate">{error}</span>
// //             </div>
// //           )}

// //           {/* LOADING */}
// //           {loading ? (
// //             <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
// //               {[1, 2, 3, 4].map((item) => (
// //                 <div
// //                   key={item}
// //                   className="aspect-square max-h-[360px] w-full animate-pulse rounded-2xl border border-slate-200 bg-slate-50"
// //                 />
// //               ))}
// //             </div>
// //           ) : announcements.length === 0 ? (
// //             /* EMPTY */
// //             <div className="flex min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/60 px-4 text-center">
// //               <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
// //                 <Bell className="h-5 w-5 text-blue-500" />
// //               </div>

// //               <h3 className="mt-3 text-sm font-semibold text-slate-700">
// //                 No announcements yet
// //               </h3>

// //               <p className="mt-1 max-w-sm text-xs text-slate-400">
// //                 Create your first announcement to share information with apartment members.
// //               </p>

// //               <button
// //                 type="button"
// //                 onClick={openCreateModal}
// //                 className="mt-4 flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-blue-700"
// //               >
// //                 <Plus className="h-3.5 w-3.5" />
// //                 Create Announcement
// //               </button>
// //             </div>
// //           ) : (
// //             /* ANNOUNCEMENT GRID */
// //             <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
// //               {announcements.map((announcement) => {
// //                 const priorityStyles =
// //                   getPriorityStyles(
// //                     announcement.priority
// //                   );

// //                 const blocks = parseMessageBlocks(
// //                   getMessage(announcement)
// //                 );

// //                 return (
// //                   <div
// //                     key={announcement.id}
// //                     className="group relative mx-auto flex aspect-square w-full max-w-[360px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
// //                   >
// //                     {/* TOP ACCENT */}
// //                     <div
// //                       className={`h-1 w-full ${
// //                         (announcement.priority || "")
// //                           .toLowerCase() === "important"
// //                           ? "bg-red-500"
// //                           : (announcement.priority || "")
// //                               .toLowerCase() === "urgent"
// //                           ? "bg-orange-500"
// //                           : "bg-blue-500"
// //                       }`}
// //                     />

// //                     <div className="flex min-h-0 flex-1 flex-col p-3.5">
// //                       {/* HEADER */}
// //                       <div className="flex items-start gap-2">
// //                         <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50">
// //                           <Bell className="h-3.5 w-3.5 text-blue-600" />
// //                         </div>

// //                         <div className="min-w-0 flex-1">
// //                           <h3
// //                             className="truncate text-sm font-semibold text-slate-800"
// //                             title={announcement.title}
// //                           >
// //                             {announcement.title}
// //                           </h3>

// //                           <div className="mt-1">
// //                             <span
// //                               className={`inline-flex rounded-full border px-2 py-0.5 text-[9px] font-semibold ${priorityStyles.bg} ${priorityStyles.text} ${priorityStyles.border}`}
// //                             >
// //                               {announcement.priority ||
// //                                 "Notice"}
// //                             </span>
// //                           </div>
// //                         </div>

// //                         <button
// //                           type="button"
// //                           onClick={() =>
// //                             setSelectedAnnouncement(
// //                               announcement
// //                             )
// //                           }
// //                           className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
// //                           title="View details"
// //                         >
// //                           <ChevronRight className="h-4 w-4" />
// //                         </button>
// //                       </div>

// //                       {/* MESSAGE */}
// //                       <div className="mt-3 min-h-0 flex-1 overflow-hidden rounded-lg bg-slate-50/70 p-2.5">
// //                        {/* <div className="mt-2 max-h-[95px] overflow-hidden rounded-lg bg-slate-50/70 p-2"> */}
// //                         <div className="line-clamp-5 max-h-[105px] overflow-hidden text-[13px] leading-5 text-slate-600">
// //                           <MessageRenderer
// //                             blocks={blocks}
// //                             compact
// //                           />
// //                         </div>
// //                       </div>

// //                       {/* DATES */}
// //                       <div className="mt-3 grid grid-cols-2 gap-2">
// //                         <div className="rounded-lg bg-slate-50 px-2.5 py-2">
// //                           <div className="flex items-center gap-1 text-[9px] font-medium uppercase tracking-wide text-slate-400">
// //                             <CalendarDays className="h-3 w-3" />
// //                             Published
// //                           </div>

// //                           <p className="mt-0.5 truncate text-[11px] font-semibold text-slate-600">
// //                             {formatDate(
// //                               getPublishedDate(
// //                                 announcement
// //                               )
// //                             )}
// //                           </p>
// //                         </div>

// //                         <div className="rounded-lg bg-slate-50 px-2.5 py-2">
// //                           <div className="flex items-center gap-1 text-[9px] font-medium uppercase tracking-wide text-slate-400">
// //                             <CalendarDays className="h-3 w-3" />
// //                             Expires
// //                           </div>

// //                           <p className="mt-0.5 truncate text-[11px] font-semibold text-slate-600">
// //                             {formatDate(
// //                               getExpiryDate(
// //                                 announcement
// //                               )
// //                             )}
// //                           </p>
// //                         </div>
// //                       </div>

// //                       {/* ACTIONS */}
// //                       <div className="mt-3 flex items-center gap-2 border-t border-slate-100 pt-2.5">
// //                         <button
// //                           type="button"
// //                           onClick={() =>
// //                             openEditModal(
// //                               announcement
// //                             )
// //                           }
// //                           className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white py-1.5 text-[10px] font-semibold text-slate-600 transition hover:bg-slate-50"
// //                         >
// //                           <Pencil className="h-3 w-3" />
// //                           Edit
// //                         </button>

// //                         <button
// //                           type="button"
// //                           onClick={() =>
// //                             handleDelete(
// //                               announcement
// //                             )
// //                           }
// //                           disabled={
// //                             deletingId ===
// //                             announcement.id
// //                           }
// //                           className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-red-100 bg-red-50 py-1.5 text-[10px] font-semibold text-red-600 transition hover:bg-red-100 disabled:opacity-50"
// //                         >
// //                           {deletingId ===
// //                           announcement.id ? (
// //                             <RefreshCw className="h-3 w-3 animate-spin" />
// //                           ) : (
// //                             <Trash2 className="h-3 w-3" />
// //                           )}
// //                           Delete
// //                         </button>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 );
// //               })}
// //             </div>
// //           )}
// //         </div>
// //       </div>

// //       {/* ------------------------------------------------------------------ */}
// //       {/* DETAILS MODAL                                                       */}
// //       {/* ------------------------------------------------------------------ */}

// //       {selectedAnnouncement && (
// //         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm">
// //           <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
// //             <div className="flex items-start justify-between border-b border-slate-100 px-5 py-4">
// //               <div className="min-w-0">
// //                 <h2 className="truncate text-base font-bold text-slate-800">
// //                   {selectedAnnouncement.title}
// //                 </h2>

// //                 <div className="mt-1.5 flex items-center gap-2">
// //                   <span
// //                     className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${
// //                       getPriorityStyles(
// //                         selectedAnnouncement.priority
// //                       ).bg
// //                     } ${
// //                       getPriorityStyles(
// //                         selectedAnnouncement.priority
// //                       ).text
// //                     } ${
// //                       getPriorityStyles(
// //                         selectedAnnouncement.priority
// //                       ).border
// //                     }`}
// //                   >
// //                     {selectedAnnouncement.priority ||
// //                       "Notice"}
// //                   </span>

// //                   <span className="text-[10px] text-slate-400">
// //                     Published{" "}
// //                     {formatDate(
// //                       getPublishedDate(
// //                         selectedAnnouncement
// //                       )
// //                     )}
// //                   </span>
// //                 </div>
// //               </div>

// //               <button
// //                 type="button"
// //                 onClick={() =>
// //                   setSelectedAnnouncement(null)
// //                 }
// //                 className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
// //               >
// //                 <X className="h-4 w-4" />
// //               </button>
// //             </div>

// //             <div className="overflow-y-auto p-5">
// //               <MessageRenderer
// //                 blocks={parseMessageBlocks(
// //                   getMessage(selectedAnnouncement)
// //                 )}
// //               />

// //               <div className="mt-5 grid grid-cols-2 gap-3">
// //                 <div className="rounded-xl bg-slate-50 p-3">
// //                   <p className="text-[10px] uppercase tracking-wide text-slate-400">
// //                     Published On
// //                   </p>

// //                   <p className="mt-1 text-xs font-semibold text-slate-700">
// //                     {formatDate(
// //                       getPublishedDate(
// //                         selectedAnnouncement
// //                       )
// //                     )}
// //                   </p>
// //                 </div>

// //                 <div className="rounded-xl bg-slate-50 p-3">
// //                   <p className="text-[10px] uppercase tracking-wide text-slate-400">
// //                     Expiry Date
// //                   </p>

// //                   <p className="mt-1 text-xs font-semibold text-slate-700">
// //                     {formatDate(
// //                       getExpiryDate(
// //                         selectedAnnouncement
// //                       )
// //                     )}
// //                   </p>
// //                 </div>
// //               </div>
// //             </div>

// //             <div className="flex justify-end gap-2 border-t border-slate-100 bg-slate-50 px-5 py-3">
// //               <button
// //                 type="button"
// //                 onClick={() => {
// //                   setSelectedAnnouncement(null);
// //                   openEditModal(
// //                     selectedAnnouncement
// //                   );
// //                 }}
// //                 className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100"
// //               >
// //                 <Pencil className="h-3.5 w-3.5" />
// //                 Edit
// //               </button>

// //               <button
// //                 type="button"
// //                 onClick={() => {
// //                   const item =
// //                     selectedAnnouncement;

// //                   setSelectedAnnouncement(null);

// //                   handleDelete(item);
// //                 }}
// //                 className="flex items-center gap-1.5 rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white hover:bg-red-700"
// //               >
// //                 <Trash2 className="h-3.5 w-3.5" />
// //                 Delete
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* ------------------------------------------------------------------ */}
// //       {/* CREATE / EDIT MODAL                                                 */}
// //       {/* ------------------------------------------------------------------ */}

// //       {showCreateModal && (
// //         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm">
// //           <div className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
// //             <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
// //               <div>
// //                 <h2 className="text-base font-bold text-slate-800">
// //                   {editingAnnouncement
// //                     ? "Edit Announcement"
// //                     : "Create Announcement"}
// //                 </h2>

// //                 <p className="mt-0.5 text-[11px] text-slate-400">
// //                   Format your announcement with text and images.
// //                 </p>
// //               </div>

// //               <button
// //                 type="button"
// //                 onClick={closeFormModal}
// //                 disabled={saving}
// //                 className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 disabled:opacity-50"
// //               >
// //                 <X className="h-4 w-4" />
// //               </button>
// //             </div>

// //             <form
// //               onSubmit={handleSubmit}
// //               className="flex min-h-0 flex-1 flex-col"
// //             >
// //               <div className="min-h-0 flex-1 overflow-y-auto p-5">
// //                 <div className="grid gap-4 md:grid-cols-2">
// //                   <div>
// //                     <label className="mb-1.5 block text-xs font-semibold text-slate-600">
// //                       Title
// //                     </label>

// //                     <input
// //                       type="text"
// //                       value={form.title}
// //                       onChange={(e) =>
// //                         setForm((prev) => ({
// //                           ...prev,
// //                           title: e.target.value,
// //                         }))
// //                       }
// //                       placeholder="Enter announcement title"
// //                       className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
// //                     />
// //                   </div>

// //                   <div>
// //                     <label className="mb-1.5 block text-xs font-semibold text-slate-600">
// //                       Priority
// //                     </label>

// //                     <select
// //                       value={form.priority}
// //                       onChange={(e) =>
// //                         setForm((prev) => ({
// //                           ...prev,
// //                           priority: e.target.value,
// //                         }))
// //                       }
// //                       className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
// //                     >
// //                       <option value="Important">
// //                         Important
// //                       </option>
// //                       <option value="Notice">
// //                         Notice
// //                       </option>
// //                       <option value="General">
// //                         General
// //                       </option>
// //                       <option value="Urgent">
// //                         Urgent
// //                       </option>
// //                     </select>
// //                   </div>

// //                   <div className="md:col-span-2">
// //                     <label className="mb-1.5 block text-xs font-semibold text-slate-600">
// //                       Expiry Date
// //                     </label>

// //                     <input
// //                       type="date"
// //                       min={getTodayInputValue()}
// //                       value={form.expiresAt}
// //                       onChange={(e) =>
// //                         setForm((prev) => ({
// //                           ...prev,
// //                           expiresAt: e.target.value,
// //                         }))
// //                       }
// //                       className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
// //                     />
// //                   </div>

// //                   <div className="md:col-span-2">
// //                     <div className="mb-1.5 flex items-center justify-between">
// //                       <label className="text-xs font-semibold text-slate-600">
// //                         Message
// //                       </label>

// //                       <span className="text-[10px] text-slate-400">
// //                         Text, formatting & images supported
// //                       </span>
// //                     </div>

// //                     <MessageEditor
// //                       blocks={messageBlocks}
// //                       onChange={updateMessageBlocks}
// //                     />
// //                   </div>
// //                 </div>
// //               </div>

// //               <div className="flex justify-end gap-2 border-t border-slate-100 bg-slate-50 px-5 py-3">
// //                 <button
// //                   type="button"
// //                   onClick={closeFormModal}
// //                   disabled={saving}
// //                   className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 disabled:opacity-50"
// //                 >
// //                   Cancel
// //                 </button>

// //                 <button
// //                   type="submit"
// //                   disabled={saving}
// //                   className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
// //                 >
// //                   {saving ? (
// //                     <RefreshCw className="h-3.5 w-3.5 animate-spin" />
// //                   ) : (
// //                     <Send className="h-3.5 w-3.5" />
// //                   )}

// //                   {saving
// //                     ? "Saving..."
// //                     : editingAnnouncement
// //                     ? "Update Announcement"
// //                     : "Create Announcement"}
// //                 </button>
// //               </div>
// //             </form>
// //           </div>
// //         </div>
// //       )}

// //       {/* GLOBAL CUSTOM POPUP */}
// //       <PopupModal
// //         popup={popup}
// //         onClose={closePopup}
// //       />
// //     </div>
// //   );
// // }

// import { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   AlertCircle,
//   Bell,
//   CalendarDays,
//   CheckCircle2,
//   ChevronRight,
//   Image as ImageIcon,
//   Info,
//   Italic,
//   Bold,
//   AlignLeft,
//   AlignCenter,
//   AlignRight,
//   Upload,
//   X,
//   Plus,
//   Pencil,
//   Trash2,
//   RefreshCw,
//   Sparkles,
//   Send,
//   TriangleAlert,
// } from "lucide-react";

// const API_URL = import.meta.env.VITE_BACKEND_URL;

// type BlockType = "text" | "image";

// type MessageBlock = {
//   id: string;
//   type: BlockType;

//   text?: string;
//   imageUrl?: string;

//   color?: string;
//   backgroundColor?: string;
//   fontSize?: number;
//   fontWeight?: "normal" | "bold";
//   fontStyle?: "normal" | "italic";
//   textAlign?: "left" | "center" | "right";
//   fontFamily?: string;
// };

// type Announcement = {
//   id: number;
//   title: string;

//   message?: string;
//   description?: string;
//   announcement?: string;

//   priority?: string;

//   publishedAt?: string;
//   published_at?: string;
//   createdAt?: string;
//   created_at?: string;

//   expiresAt?: string;
//   expires_at?: string;
//   expiryDate?: string;
//   expiry_date?: string;

//   organisation_id?: number;
//   created_by?: number;
//   is_active?: boolean;
// };

// type AnnouncementForm = {
//   title: string;
//   message: string;
//   priority: string;
//   expiresAt: string;
// };

// type PopupType = "success" | "error" | "warning" | "info" | "confirm";

// type PopupState = {
//   open: boolean;
//   type: PopupType;
//   title: string;
//   message: string;
//   confirmText?: string;
//   cancelText?: string;
//   onConfirm?: () => void;
// };

// const EMOJIS = [
//   "😀",
//   "😊",
//   "🎉",
//   "📢",
//   "🔔",
//   "⚠️",
//   "✅",
//   "❌",
//   "⭐",
//   "❤️",
//   "🏠",
//   "🎁",
//   "📅",
//   "📌",
//   "🚨",
//   "🙏",
// ];

// const FONT_FAMILIES = [
//   "Arial",
//   "Georgia",
//   "Times New Roman",
//   "Verdana",
//   "Trebuchet MS",
//   "Courier New",
// ];

// const FONT_SIZES = [12, 14, 16, 18, 20, 24, 28, 32];

// const createTextBlock = (): MessageBlock => ({
//   id: `text-${Date.now()}-${Math.random()}`,
//   type: "text",
//   text: "",
//   color: "#1e293b",
//   backgroundColor: "transparent",
//   fontSize: 16,
//   fontWeight: "normal",
//   fontStyle: "normal",
//   textAlign: "left",
//   fontFamily: "Arial",
// });

// const createImageBlock = (imageUrl = ""): MessageBlock => ({
//   id: `image-${Date.now()}-${Math.random()}`,
//   type: "image",
//   imageUrl,
// });

// const parseMessageBlocks = (message?: string): MessageBlock[] => {
//   if (!message) {
//     return [];
//   }

//   try {
//     const parsed = JSON.parse(message);

//     if (Array.isArray(parsed)) {
//       return parsed;
//     }

//     if (parsed?.blocks && Array.isArray(parsed.blocks)) {
//       return parsed.blocks;
//     }

//     if (parsed?.content && Array.isArray(parsed.content)) {
//       return parsed.content;
//     }
//   } catch {
//     // Normal text message
//   }

//   return [
//     {
//       ...createTextBlock(),
//       text: message,
//     },
//   ];
// };

// const getMessage = (announcement: Announcement): string => {
//   return (
//     announcement.message ||
//     announcement.description ||
//     announcement.announcement ||
//     ""
//   );
// };

// const getPublishedDate = (announcement: Announcement): string => {
//   return (
//     announcement.publishedAt ||
//     announcement.published_at ||
//     announcement.createdAt ||
//     announcement.created_at ||
//     ""
//   );
// };

// const getExpiryDate = (announcement: Announcement): string => {
//   return (
//     announcement.expiresAt ||
//     announcement.expires_at ||
//     announcement.expiryDate ||
//     announcement.expiry_date ||
//     ""
//   );
// };

// const formatDate = (value?: string) => {
//   if (!value) return "-";

//   const date = new Date(value);

//   if (Number.isNaN(date.getTime())) {
//     return value;
//   }

//   return date.toLocaleDateString("en-IN", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   });
// };

// const getDateInputValue = (value?: string) => {
//   if (!value) return "";

//   const date = new Date(value);

//   if (Number.isNaN(date.getTime())) {
//     return value.substring(0, 10);
//   }

//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   const day = String(date.getDate()).padStart(2, "0");

//   return `${year}-${month}-${day}`;
// };

// const getTodayInputValue = () => {
//   const today = new Date();

//   const year = today.getFullYear();
//   const month = String(today.getMonth() + 1).padStart(2, "0");
//   const day = String(today.getDate()).padStart(2, "0");

//   return `${year}-${month}-${day}`;
// };

// const getPriorityStyles = (priority?: string) => {
//   switch ((priority || "").toLowerCase()) {
//     case "important":
//       return {
//         bg: "bg-red-50",
//         text: "text-red-600",
//         border: "border-red-100",
//       };

//     case "urgent":
//       return {
//         bg: "bg-orange-50",
//         text: "text-orange-600",
//         border: "border-orange-100",
//       };

//     case "general":
//       return {
//         bg: "bg-slate-50",
//         text: "text-slate-600",
//         border: "border-slate-100",
//       };

//     default:
//       return {
//         bg: "bg-blue-50",
//         text: "text-blue-600",
//         border: "border-blue-100",
//       };
//   }
// };

// const getApiResponseMessage = (
//   data: any,
//   fallback: string
// ): string => {
//   if (data === null || data === undefined) {
//     return fallback;
//   }

//   if (typeof data === "string") {
//     const trimmed = data.trim();
//     return trimmed || fallback;
//   }

//   const candidates = [
//     data?.message,
//     data?.msg,
//     data?.error,
//     data?.detail,
//     data?.data?.message,
//     data?.data?.msg,
//     data?.data?.error,
//     data?.data?.detail,
//   ];

//   for (const candidate of candidates) {
//     if (candidate === null || candidate === undefined) continue;

//     if (typeof candidate === "string") {
//       const trimmed = candidate.trim();
//       if (trimmed) return trimmed;
//     }

//     if (typeof candidate === "object") {
//       try {
//         return JSON.stringify(candidate);
//       } catch {
//         // Continue to the next candidate.
//       }
//     }
//   }

//   if (Array.isArray(data?.errors) && data.errors.length) {
//     return data.errors
//       .map((item: any) =>
//         typeof item === "string"
//           ? item
//           : item?.message || item?.msg || JSON.stringify(item)
//       )
//       .join("\n");
//   }

//   if (Array.isArray(data?.data?.errors) && data.data.errors.length) {
//     return data.data.errors
//       .map((item: any) =>
//         typeof item === "string"
//           ? item
//           : item?.message || item?.msg || JSON.stringify(item)
//       )
//       .join("\n");
//   }

//   try {
//     const serialized = JSON.stringify(data, null, 2);
//     return serialized && serialized !== "{}" ? serialized : fallback;
//   } catch {
//     return fallback;
//   }
// };

// /* -------------------------------------------------------------------------- */
// /* POPUP                                                                      */
// /* -------------------------------------------------------------------------- */

// type PopupModalProps = {
//   popup: PopupState;
//   onClose: () => void;
// };

// const PopupModal = ({ popup, onClose }: PopupModalProps) => {
//   if (!popup.open) return null;

//   // ONE shared popup theme for success, validation, API responses,
//   // errors, image upload errors and confirmations. Only the icon changes.
//   const Icon =
//     popup.type === "confirm"
//       ? TriangleAlert
//       : popup.type === "error"
//       ? AlertCircle
//       : popup.type === "warning"
//       ? TriangleAlert
//       : popup.type === "success"
//       ? CheckCircle2
//       : Info;

//   const iconBg = "bg-blue-50";
//   const iconColor = "text-blue-600";
//   const buttonClass = "bg-blue-600 hover:bg-blue-700";

//   const handleConfirm = () => {
//     const callback = popup.onConfirm;

//     onClose();

//     if (callback) {
//       setTimeout(() => {
//         callback();
//       }, 100);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm">
//       <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
//         <div className="p-5">
//           <div className="flex items-start gap-3">
//             <div
//               className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${iconBg}`}
//             >
//               <Icon className={`h-5 w-5 ${iconColor}`} />
//             </div>

//             <div className="min-w-0 flex-1">
//               <h3 className="text-base font-semibold text-slate-800">
//                 {popup.title}
//               </h3>

//               <p className="mt-1.5 whitespace-pre-wrap break-words text-sm leading-5 text-slate-600">
//                 {popup.message}
//               </p>
//             </div>

//             <button
//               type="button"
//               onClick={onClose}
//               className="rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
//             >
//               <X className="h-4 w-4" />
//             </button>
//           </div>
//         </div>

//         <div className="flex justify-end gap-2 border-t border-slate-100 bg-slate-50 px-5 py-3">
//           {popup.type === "confirm" && (
//             <button
//               type="button"
//               onClick={onClose}
//               className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-100"
//             >
//               {popup.cancelText || "Cancel"}
//             </button>
//           )}

//           <button
//             type="button"
//             onClick={
//               popup.type === "confirm"
//                 ? handleConfirm
//                 : onClose
//             }
//             className={`rounded-lg px-4 py-2 text-xs font-semibold text-white transition ${buttonClass}`}
//           >
//             {popup.type === "confirm"
//               ? popup.confirmText || "Confirm"
//               : "OK"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// /* -------------------------------------------------------------------------- */
// /* IMAGE UPLOAD                                                               */
// /* -------------------------------------------------------------------------- */

// const uploadImageFile = async (file: File): Promise<string> => {
//   if (!file.type.startsWith("image/")) {
//     throw new Error("Please select a valid image file.");
//   }

//   if (file.size > 8 * 1024 * 1024) {
//     throw new Error("Image size must be less than 8 MB.");
//   }

//   const formData = new FormData();
//   formData.append("image", file);

//   const response = await axios.post(
//     `${API_URL}/api/upload/image`,
//     formData,
//     {
//       withCredentials: true,
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     }
//   );

//   return (
//     response.data?.url ||
//     response.data?.imageUrl ||
//     response.data?.path ||
//     response.data?.data?.url ||
//     ""
//   );
// };

// /* -------------------------------------------------------------------------- */
// /* EMOJI PICKER                                                               */
// /* -------------------------------------------------------------------------- */

// type EmojiPickerProps = {
//   onSelect: (emoji: string) => void;
// };

// const EmojiPicker = ({ onSelect }: EmojiPickerProps) => {
//   return (
//     <div className="absolute left-0 top-full z-50 mt-1 w-52 rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
//       <div className="grid grid-cols-8 gap-1">
//         {EMOJIS.map((emoji) => (
//           <button
//             key={emoji}
//             type="button"
//             onClick={() => onSelect(emoji)}
//             className="flex h-7 w-7 items-center justify-center rounded-md text-base transition hover:bg-slate-100"
//           >
//             {emoji}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// /* -------------------------------------------------------------------------- */
// /* TEXT BLOCK EDITOR                                                          */
// /* -------------------------------------------------------------------------- */

// type TextBlockEditorProps = {
//   block: MessageBlock;
//   onChange: (block: MessageBlock) => void;
//   onRemove: () => void;
// };

// const TextBlockEditor = ({
//   block,
//   onChange,
//   onRemove,
// }: TextBlockEditorProps) => {
//   const [showEmoji, setShowEmoji] = useState(false);

//   const update = (changes: Partial<MessageBlock>) => {
//     onChange({
//       ...block,
//       ...changes,
//     });
//   };

//   return (
//     <div className="rounded-xl border border-slate-200 bg-white p-3">
//       <div className="mb-2 flex items-center justify-between">
//         <span className="text-xs font-semibold text-slate-600">
//           Text
//         </span>

//         <button
//           type="button"
//           onClick={onRemove}
//           className="rounded-md p-1 text-slate-400 hover:bg-red-50 hover:text-red-500"
//         >
//           <X className="h-4 w-4" />
//         </button>
//       </div>

//       <textarea
//         value={block.text || ""}
//         onChange={(e) => update({ text: e.target.value })}
//         placeholder="Write announcement message..."
//         rows={4}
//         className="w-full resize-none rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
//       />

//       <div className="mt-2 flex flex-wrap items-center gap-1.5">
//         <select
//           value={block.fontFamily || "Arial"}
//           onChange={(e) =>
//             update({
//               fontFamily: e.target.value,
//             })
//           }
//           className="h-8 rounded-md border border-slate-200 bg-white px-2 text-[11px] text-slate-600 outline-none"
//         >
//           {FONT_FAMILIES.map((font) => (
//             <option key={font} value={font}>
//               {font}
//             </option>
//           ))}
//         </select>

//         <select
//           value={block.fontSize || 16}
//           onChange={(e) =>
//             update({
//               fontSize: Number(e.target.value),
//             })
//           }
//           className="h-8 rounded-md border border-slate-200 bg-white px-2 text-[11px] text-slate-600 outline-none"
//         >
//           {FONT_SIZES.map((size) => (
//             <option key={size} value={size}>
//               {size}px
//             </option>
//           ))}
//         </select>

//         <button
//           type="button"
//           onClick={() =>
//             update({
//               fontWeight:
//                 block.fontWeight === "bold"
//                   ? "normal"
//                   : "bold",
//             })
//           }
//           className={`flex h-8 w-8 items-center justify-center rounded-md border ${
//             block.fontWeight === "bold"
//               ? "border-blue-200 bg-blue-50 text-blue-600"
//               : "border-slate-200 text-slate-500"
//           }`}
//         >
//           <Bold className="h-3.5 w-3.5" />
//         </button>

//         <button
//           type="button"
//           onClick={() =>
//             update({
//               fontStyle:
//                 block.fontStyle === "italic"
//                   ? "normal"
//                   : "italic",
//             })
//           }
//           className={`flex h-8 w-8 items-center justify-center rounded-md border ${
//             block.fontStyle === "italic"
//               ? "border-blue-200 bg-blue-50 text-blue-600"
//               : "border-slate-200 text-slate-500"
//           }`}
//         >
//           <Italic className="h-3.5 w-3.5" />
//         </button>

//         <button
//           type="button"
//           onClick={() => update({ textAlign: "left" })}
//           className={`flex h-8 w-8 items-center justify-center rounded-md border ${
//             block.textAlign === "left"
//               ? "border-blue-200 bg-blue-50 text-blue-600"
//               : "border-slate-200 text-slate-500"
//           }`}
//         >
//           <AlignLeft className="h-3.5 w-3.5" />
//         </button>

//         <button
//           type="button"
//           onClick={() => update({ textAlign: "center" })}
//           className={`flex h-8 w-8 items-center justify-center rounded-md border ${
//             block.textAlign === "center"
//               ? "border-blue-200 bg-blue-50 text-blue-600"
//               : "border-slate-200 text-slate-500"
//           }`}
//         >
//           <AlignCenter className="h-3.5 w-3.5" />
//         </button>

//         <button
//           type="button"
//           onClick={() => update({ textAlign: "right" })}
//           className={`flex h-8 w-8 items-center justify-center rounded-md border ${
//             block.textAlign === "right"
//               ? "border-blue-200 bg-blue-50 text-blue-600"
//               : "border-slate-200 text-slate-500"
//           }`}
//         >
//           <AlignRight className="h-3.5 w-3.5" />
//         </button>

//         <div className="relative">
//           <button
//             type="button"
//             onClick={() => setShowEmoji((prev) => !prev)}
//             className="flex h-8 items-center gap-1 rounded-md border border-slate-200 px-2 text-xs text-slate-500 hover:bg-slate-50"
//           >
//             😊
//           </button>

//           {showEmoji && (
//             <EmojiPicker
//               onSelect={(emoji) => {
//                 update({
//                   text: `${block.text || ""}${emoji}`,
//                 });
//                 setShowEmoji(false);
//               }}
//             />
//           )}
//         </div>

//         <label className="flex h-8 cursor-pointer items-center gap-1 rounded-md border border-slate-200 px-2 text-xs text-slate-500 hover:bg-slate-50">
//           <span
//             className="h-4 w-4 rounded border border-slate-200"
//             style={{
//               backgroundColor:
//                 block.color || "#1e293b",
//             }}
//           />
//           <input
//             type="color"
//             value={block.color || "#1e293b"}
//             onChange={(e) =>
//               update({
//                 color: e.target.value,
//               })
//             }
//             className="absolute h-0 w-0 opacity-0"
//           />
//         </label>
//       </div>
//     </div>
//   );
// };

// /* -------------------------------------------------------------------------- */
// /* IMAGE BLOCK EDITOR                                                         */
// /* -------------------------------------------------------------------------- */

// type ImageBlockEditorProps = {
//   block: MessageBlock;
//   onChange: (block: MessageBlock) => void;
//   onRemove: () => void;
// };

// const ImageBlockEditor = ({
//   block,
//   onChange,
//   onRemove,
// }: ImageBlockEditorProps) => {
//   const [uploading, setUploading] = useState(false);

//   const handleFile = async (file?: File) => {
//     if (!file) return;

//     try {
//       setUploading(true);

//       const url = await uploadImageFile(file);

//       if (!url) {
//         throw new Error("Image URL was not returned by the server.");
//       }

//       onChange({
//         ...block,
//         imageUrl: url,
//       });
//     } catch (error: any) {
//       window.dispatchEvent(
//         new CustomEvent("announcement-upload-error", {
//           detail:
//             error?.response?.data?.message ||
//             error?.message ||
//             "Unable to upload image.",
//         })
//       );
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="rounded-xl border border-slate-200 bg-white p-3">
//       <div className="mb-2 flex items-center justify-between">
//         <span className="text-xs font-semibold text-slate-600">
//           Image / Banner
//         </span>

//         <button
//           type="button"
//           onClick={onRemove}
//           className="rounded-md p-1 text-slate-400 hover:bg-red-50 hover:text-red-500"
//         >
//           <X className="h-4 w-4" />
//         </button>
//       </div>

//       {block.imageUrl ? (
//         <div className="relative overflow-hidden rounded-lg border border-slate-200">
//           <img
//             src={block.imageUrl}
//             alt="Announcement"
//             className="max-h-52 w-full object-contain"
//           />

//           <label className="absolute bottom-2 right-2 flex cursor-pointer items-center gap-1 rounded-lg bg-white/95 px-2.5 py-1.5 text-xs font-medium text-slate-600 shadow">
//             <Upload className="h-3.5 w-3.5" />
//             Replace
//             <input
//               type="file"
//               accept="image/png,image/jpeg,image/gif,image/webp"
//               className="hidden"
//               onChange={(e) =>
//                 handleFile(e.target.files?.[0])
//               }
//             />
//           </label>
//         </div>
//       ) : (
//         <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center transition hover:bg-slate-100">
//           {uploading ? (
//             <>
//               <RefreshCw className="h-6 w-6 animate-spin text-blue-500" />
//               <p className="mt-2 text-xs text-slate-500">
//                 Uploading...
//               </p>
//             </>
//           ) : (
//             <>
//               <ImageIcon className="h-7 w-7 text-slate-400" />
//               <p className="mt-2 text-xs font-medium text-slate-600">
//                 Click to upload image
//               </p>
//               <p className="mt-1 text-[10px] text-slate-400">
//                 PNG, JPG, GIF or WebP • Max 8 MB
//               </p>
//             </>
//           )}

//           <input
//             type="file"
//             accept="image/png,image/jpeg,image/gif,image/webp"
//             className="hidden"
//             onChange={(e) =>
//               handleFile(e.target.files?.[0])
//             }
//           />
//         </label>
//       )}
//     </div>
//   );
// };

// /* -------------------------------------------------------------------------- */
// /* MESSAGE EDITOR                                                             */
// /* -------------------------------------------------------------------------- */

// type MessageEditorProps = {
//   blocks: MessageBlock[];
//   onChange: (blocks: MessageBlock[]) => void;
// };

// const MessageEditor = ({
//   blocks,
//   onChange,
// }: MessageEditorProps) => {
//   const updateBlock = (
//     index: number,
//     block: MessageBlock
//   ) => {
//     const next = [...blocks];
//     next[index] = block;
//     onChange(next);
//   };

//   const removeBlock = (index: number) => {
//     onChange(blocks.filter((_, i) => i !== index));
//   };

//   const addTextBlock = () => {
//     onChange([...blocks, createTextBlock()]);
//   };

//   const addImageBlock = () => {
//     onChange([...blocks, createImageBlock()]);
//   };

//   return (
//     <div className="space-y-2">
//       {blocks.length === 0 && (
//         <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-7 text-center">
//           <Sparkles className="mx-auto h-7 w-7 text-slate-300" />

//           <p className="mt-2 text-sm font-medium text-slate-500">
//             Start creating your announcement
//           </p>

//           <p className="mt-1 text-xs text-slate-400">
//             Add text, formatting or an image/banner.
//           </p>
//         </div>
//       )}

//       {blocks.map((block, index) =>
//         block.type === "image" ? (
//           <ImageBlockEditor
//             key={block.id}
//             block={block}
//             onChange={(updated) =>
//               updateBlock(index, updated)
//             }
//             onRemove={() => removeBlock(index)}
//           />
//         ) : (
//           <TextBlockEditor
//             key={block.id}
//             block={block}
//             onChange={(updated) =>
//               updateBlock(index, updated)
//             }
//             onRemove={() => removeBlock(index)}
//           />
//         )
//       )}

//       <div className="flex flex-wrap gap-2 pt-1">
//         <button
//           type="button"
//           onClick={addTextBlock}
//           className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-50"
//         >
//           <Plus className="h-3.5 w-3.5" />
//           Add Text
//         </button>

//         <button
//           type="button"
//           onClick={addImageBlock}
//           className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-50"
//         >
//           <ImageIcon className="h-3.5 w-3.5" />
//           Add Image
//         </button>
//       </div>
//     </div>
//   );
// };

// /* -------------------------------------------------------------------------- */
// /* MESSAGE RENDERER                                                           */
// /* -------------------------------------------------------------------------- */

// type MessageRendererProps = {
//   blocks: MessageBlock[];
//   compact?: boolean;
// };

// const MessageRenderer = ({
//   blocks,
//   compact = false,
// }: MessageRendererProps) => {
//   if (!blocks.length) {
//     return (
//       <span className="text-slate-400">
//         No message available
//       </span>
//     );
//   }

//   return (
//     <div className={compact ? "space-y-1.5" : "space-y-3"}>
//       {blocks.map((block) => {
//         if (block.type === "image" && block.imageUrl) {
//           return (
//             <img
//               key={block.id}
//               src={block.imageUrl}
//               alt="Announcement"
//               className={
//                 compact
//                   ? "max-h-28 w-full rounded-lg object-cover"
//                   : "max-h-80 w-full rounded-xl object-contain"
//               }
//             />
//           );
//         }

//         if (block.type === "text") {
//           const fontSize = compact
//             ? Math.min(Number(block.fontSize || 16), 14)
//             : Number(block.fontSize || 16);

//           return (
//             <div
//               key={block.id}
//               className="whitespace-pre-wrap break-words"
//               style={{
//                 color: block.color || "#1e293b",
//                 backgroundColor:
//                   block.backgroundColor &&
//                   block.backgroundColor !== "transparent"
//                     ? block.backgroundColor
//                     : undefined,
//                 fontSize,
//                 fontWeight:
//                   block.fontWeight || "normal",
//                 fontStyle:
//                   block.fontStyle || "normal",
//                 textAlign:
//                   block.textAlign || "left",
//                 fontFamily:
//                   block.fontFamily || "Arial",
//                 lineHeight: compact ? 1.45 : 1.6,
//               }}
//             >
//               {block.text}
//             </div>
//           );
//         }

//         return null;
//       })}
//     </div>
//   );
// };

// /* -------------------------------------------------------------------------- */
// /* MAIN COMPONENT                                                             */
// /* -------------------------------------------------------------------------- */

// export default function Announcements() {
//   const [announcements, setAnnouncements] = useState<
//     Announcement[]
//   >([]);

//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);

//   const [selectedAnnouncement, setSelectedAnnouncement] =
//     useState<Announcement | null>(null);

//   const [showCreateModal, setShowCreateModal] =
//     useState(false);

//   const [editingAnnouncement, setEditingAnnouncement] =
//     useState<Announcement | null>(null);

//   const [form, setForm] = useState<AnnouncementForm>({
//     title: "",
//     message: "",
//     priority: "Notice",
//     expiresAt: "",
//   });

//   const [messageBlocks, setMessageBlocks] = useState<
//     MessageBlock[]
//   >([]);

//   const [saving, setSaving] = useState(false);
//   const [deletingId, setDeletingId] = useState<number | null>(
//     null
//   );

//   const [popup, setPopup] = useState<PopupState>({
//     open: false,
//     type: "info",
//     title: "",
//     message: "",
//   });

//   /* ------------------------------------------------------------------------ */
//   /* POPUP HELPERS                                                            */
//   /* ------------------------------------------------------------------------ */

//   const showPopup = (
//     type: PopupType,
//     title: string,
//     message: string,
//     options?: {
//       confirmText?: string;
//       cancelText?: string;
//       onConfirm?: () => void;
//     }
//   ) => {
//     setPopup({
//       open: true,
//       type,
//       title,
//       message,
//       confirmText: options?.confirmText,
//       cancelText: options?.cancelText,
//       onConfirm: options?.onConfirm,
//     });
//   };

//   const closePopup = () => {
//     setPopup((prev) => ({
//       ...prev,
//       open: false,
//     }));
//   };

//   const showApiError = (error: any, fallback: string) => {
//     const message = getApiResponseMessage(
//       error?.response?.data ?? error?.data,
//       error?.message || fallback
//     );

//     showPopup("error", "API Response", message);
//   };

//   /* ------------------------------------------------------------------------ */
//   /* FETCH                                                                    */
//   /* ------------------------------------------------------------------------ */

//   const fetchAnnouncements = async () => {
//     try {

//       const response = await axios.get(
//         `${API_URL}/api/admin/announcements`,
//         {
//           withCredentials: true,
//         }
//       );

//       const data = response.data;

//       const list =
//         Array.isArray(data)
//           ? data
//           : Array.isArray(data?.announcements)
//           ? data.announcements
//           : Array.isArray(data?.data)
//           ? data.data
//           : [];

//       setAnnouncements(list);
//     } catch (err: any) {
//       const message = getApiResponseMessage(
//         err?.response?.data,
//         err?.message || "Unable to fetch announcements."
//       );

//       showPopup(
//         "error",
//         "API Response",
//         message
//       );
//     }
//   };

//   useEffect(() => {
//     const load = async () => {
//       setLoading(true);

//       await fetchAnnouncements();

//       setLoading(false);
//     };

//     load();
//   }, []);

//   /* ------------------------------------------------------------------------ */
//   /* CREATE                                                                    */
//   /* ------------------------------------------------------------------------ */

//   const openCreateModal = () => {
//     setEditingAnnouncement(null);

//     setForm({
//       title: "",
//       message: "",
//       priority: "Notice",
//       expiresAt: "",
//     });

//     setMessageBlocks([
//       createTextBlock(),
//     ]);

//     setShowCreateModal(true);
//   };

//   /* ------------------------------------------------------------------------ */
//   /* EDIT                                                                      */
//   /* ------------------------------------------------------------------------ */

//   const openEditModal = (
//     announcement: Announcement
//   ) => {
//     setEditingAnnouncement(announcement);

//     setForm({
//       title: announcement.title || "",
//       message: getMessage(announcement),
//       priority: announcement.priority || "Notice",
//       expiresAt: getDateInputValue(
//         getExpiryDate(announcement)
//       ),
//     });

//     setMessageBlocks(
//       parseMessageBlocks(getMessage(announcement))
//     );

//     setShowCreateModal(true);
//   };

//   const closeFormModal = () => {
//     if (saving) return;

//     setShowCreateModal(false);
//     setEditingAnnouncement(null);
//   };

//   /* ------------------------------------------------------------------------ */
//   /* MESSAGE BLOCKS                                                            */
//   /* ------------------------------------------------------------------------ */

//   const updateMessageBlocks = (
//     blocks: MessageBlock[]
//   ) => {
//     setMessageBlocks(blocks);

//     setForm((prev) => ({
//       ...prev,
//       message: JSON.stringify(blocks),
//     }));
//   };

//   const hasMessageContent = () => {
//     return messageBlocks.some((block) => {
//       if (block.type === "image") {
//         return Boolean(block.imageUrl);
//       }

//       return Boolean(block.text?.trim());
//     });
//   };

//   /* ------------------------------------------------------------------------ */
//   /* SUBMIT                                                                    */
//   /* ------------------------------------------------------------------------ */

//   const handleSubmit = async (
//     e: React.FormEvent
//   ) => {
//     e.preventDefault();

//     if (!form.title.trim()) {
//       showPopup(
//         "warning",
//         "Validation",
//         "Please enter an announcement title."
//       );
//       return;
//     }

//     if (!hasMessageContent()) {
//       showPopup(
//         "warning",
//         "Validation",
//         "Please enter an announcement message or add an image."
//       );
//       return;
//     }

//     if (!form.expiresAt) {
//       showPopup(
//         "warning",
//         "Validation",
//         "Please select an expiry date."
//       );
//       return;
//     }

//     const today = getTodayInputValue();

//     if (form.expiresAt < today) {
//       showPopup(
//         "warning",
//         "Invalid Expiry Date",
//         "Expiry date cannot be earlier than today."
//       );
//       return;
//     }

//     try {
//       setSaving(true);

//       const payload = {
//         title: form.title.trim(),
//         message: JSON.stringify(messageBlocks),
//         priority: form.priority,
//         expiresAt: form.expiresAt,
//       };

//       let response;

//       if (editingAnnouncement) {
//         response = await axios.put(
//           `${API_URL}/api/admin/announcements/${editingAnnouncement.id}`,
//           payload,
//           {
//             withCredentials: true,
//           }
//         );
//       } else {
//         response = await axios.post(
//           `${API_URL}/api/admin/announcements`,
//           payload,
//           {
//             withCredentials: true,
//           }
//         );
//       }

//       const apiMessage = getApiResponseMessage(
//         response.data,
//         editingAnnouncement
//           ? "Announcement updated successfully."
//           : "Announcement created successfully."
//       );

//       setShowCreateModal(false);
//       setEditingAnnouncement(null);

//       await fetchAnnouncements();

//       showPopup(
//         "success",
//         "Announcement",
//         apiMessage
//       );
//     } catch (err: any) {
//       showApiError(
//         err,
//         editingAnnouncement
//           ? "Unable to update announcement."
//           : "Unable to create announcement."
//       );
//     } finally {
//       setSaving(false);
//     }
//   };

//   /* ------------------------------------------------------------------------ */
//   /* DELETE                                                                    */
//   /* ------------------------------------------------------------------------ */

//   const performDelete = async (id: number) => {
//     try {
//       setDeletingId(id);

//       const response = await axios.delete(
//         `${API_URL}/api/admin/announcements/${id}`,
//         {
//           withCredentials: true,
//         }
//       );

//       const apiMessage = getApiResponseMessage(
//         response.data,
//         "Announcement deleted successfully."
//       );

//       setAnnouncements((prev) =>
//         prev.filter((item) => item.id !== id)
//       );

//       if (selectedAnnouncement?.id === id) {
//         setSelectedAnnouncement(null);
//       }

//       showPopup(
//         "success",
//         "Announcement",
//         apiMessage
//       );
//     } catch (err: any) {
//       showApiError(
//         err,
//         "Unable to delete announcement."
//       );
//     } finally {
//       setDeletingId(null);
//     }
//   };

//   const handleDelete = (
//     announcement: Announcement
//   ) => {
//     showPopup(
//       "confirm",
//       "Delete Announcement",
//       `Are you sure you want to delete "${announcement.title}"?`,
//       {
//         confirmText: "Delete",
//         cancelText: "Cancel",
//         onConfirm: () =>
//           performDelete(announcement.id),
//       }
//     );
//   };

//   /* ------------------------------------------------------------------------ */
//   /* REFRESH                                                                   */
//   /* ------------------------------------------------------------------------ */

//   const handleRefresh = async () => {
//     try {
//       setRefreshing(true);
//       await fetchAnnouncements();
//     } finally {
//       setRefreshing(false);
//     }
//   };

//   /* ------------------------------------------------------------------------ */
//   /* UPLOAD ERROR EVENT                                                        */
//   /* ------------------------------------------------------------------------ */

//   useEffect(() => {
//     const handler = (event: Event) => {
//       const customEvent = event as CustomEvent;

//       showPopup(
//         "error",
//         "Image Upload",
//         getApiResponseMessage(
//           customEvent.detail,
//           "Unable to upload image."
//         )
//       );
//     };

//     window.addEventListener(
//       "announcement-upload-error",
//       handler
//     );

//     return () => {
//       window.removeEventListener(
//         "announcement-upload-error",
//         handler
//       );
//     };
//   }, []);

//   /* ------------------------------------------------------------------------ */
//   /* RENDER                                                                    */
//   /* ------------------------------------------------------------------------ */

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 sm:p-6">
//       <div className="mx-auto max-w-[1450px]">
//         {/* PAGE HEADER */}
//         <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//           <div>
//             <div className="flex items-center gap-2">
//               <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 shadow-sm">
//                 <Bell className="h-4.5 w-4.5 text-white" />
//               </div>

//               <div>
//                 <h1 className="text-xl font-bold tracking-tight text-slate-800">
//                   Announcements
//                 </h1>

//                 <p className="text-xs text-slate-500">
//                   Create and manage announcements for your apartment members
//                 </p>
//               </div>
//             </div>
//           </div>

//           <button
//             type="button"
//             onClick={openCreateModal}
//             className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700"
//           >
//             <Plus className="h-4 w-4" />
//             Create Announcement
//           </button>
//         </div>

//         {/* MAIN CARD */}
//         <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-sm backdrop-blur-sm sm:p-5">
//           <div className="mb-4 flex items-center justify-between">
//             <div>
//               <div className="flex items-center gap-2">
//                 <h2 className="text-sm font-semibold text-slate-800">
//                   Published Announcements
//                 </h2>

//                 <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-600">
//                   {announcements.length}
//                 </span>
//               </div>

//               <p className="mt-0.5 text-[11px] text-slate-400">
//                 Manage announcements sent to apartment members
//               </p>
//             </div>

//             <button
//               type="button"
//               onClick={handleRefresh}
//               disabled={refreshing}
//               className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 disabled:opacity-50"
//               title="Refresh"
//             >
//               <RefreshCw
//                 className={`h-3.5 w-3.5 ${
//                   refreshing ? "animate-spin" : ""
//                 }`}
//               />
//             </button>
//           </div>

//           {/* LOADING */}
//           {loading ? (
//             <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//               {[1, 2, 3, 4].map((item) => (
//                 <div
//                   key={item}
//                   className="aspect-square max-h-[360px] w-full animate-pulse rounded-2xl border border-slate-200 bg-slate-50"
//                 />
//               ))}
//             </div>
//           ) : announcements.length === 0 ? (
//             /* EMPTY */
//             <div className="flex min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/60 px-4 text-center">
//               <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
//                 <Bell className="h-5 w-5 text-blue-500" />
//               </div>

//               <h3 className="mt-3 text-sm font-semibold text-slate-700">
//                 No announcements yet
//               </h3>

//               <p className="mt-1 max-w-sm text-xs text-slate-400">
//                 Create your first announcement to share information with apartment members.
//               </p>

//               <button
//                 type="button"
//                 onClick={openCreateModal}
//                 className="mt-4 flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-blue-700"
//               >
//                 <Plus className="h-3.5 w-3.5" />
//                 Create Announcement
//               </button>
//             </div>
//           ) : (
//             /* ANNOUNCEMENT GRID */
//             <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
//               {announcements.map((announcement) => {
//                 const priorityStyles =
//                   getPriorityStyles(
//                     announcement.priority
//                   );

//                 const blocks = parseMessageBlocks(
//                   getMessage(announcement)
//                 );

//                 return (
//                   <div
//                     key={announcement.id}
//                     className="group relative mx-auto flex aspect-square w-full max-w-[360px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
//                   >
//                     {/* TOP ACCENT */}
//                     <div
//                       className={`h-1 w-full ${
//                         (announcement.priority || "")
//                           .toLowerCase() === "important"
//                           ? "bg-red-500"
//                           : (announcement.priority || "")
//                               .toLowerCase() === "urgent"
//                           ? "bg-orange-500"
//                           : "bg-blue-500"
//                       }`}
//                     />

//                     <div className="flex min-h-0 flex-1 flex-col p-3.5">
//                       {/* HEADER */}
//                       <div className="flex items-start gap-2">
//                         <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50">
//                           <Bell className="h-3.5 w-3.5 text-blue-600" />
//                         </div>

//                         <div className="min-w-0 flex-1">
//                           <h3
//                             className="truncate text-sm font-semibold text-slate-800"
//                             title={announcement.title}
//                           >
//                             {announcement.title}
//                           </h3>

//                           <div className="mt-1">
//                             <span
//                               className={`inline-flex rounded-full border px-2 py-0.5 text-[9px] font-semibold ${priorityStyles.bg} ${priorityStyles.text} ${priorityStyles.border}`}
//                             >
//                               {announcement.priority ||
//                                 "Notice"}
//                             </span>
//                           </div>
//                         </div>

//                         <button
//                           type="button"
//                           onClick={() =>
//                             setSelectedAnnouncement(
//                               announcement
//                             )
//                           }
//                           className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
//                           title="View details"
//                         >
//                           <ChevronRight className="h-4 w-4" />
//                         </button>
//                       </div>

//                       {/* MESSAGE */}
//                       <div className="mt-3 min-h-0 flex-1 overflow-hidden rounded-lg bg-slate-50/70 p-2.5">
//                        {/* <div className="mt-2 max-h-[95px] overflow-hidden rounded-lg bg-slate-50/70 p-2"> */}
//                         <div className="line-clamp-5 max-h-[105px] overflow-hidden text-[13px] leading-5 text-slate-600">
//                           <MessageRenderer
//                             blocks={blocks}
//                             compact
//                           />
//                         </div>
//                       </div>

//                       {/* DATES */}
//                       <div className="mt-3 grid grid-cols-2 gap-2">
//                         <div className="rounded-lg bg-slate-50 px-2.5 py-2">
//                           <div className="flex items-center gap-1 text-[9px] font-medium uppercase tracking-wide text-slate-400">
//                             <CalendarDays className="h-3 w-3" />
//                             Published
//                           </div>

//                           <p className="mt-0.5 truncate text-[11px] font-semibold text-slate-600">
//                             {formatDate(
//                               getPublishedDate(
//                                 announcement
//                               )
//                             )}
//                           </p>
//                         </div>

//                         <div className="rounded-lg bg-slate-50 px-2.5 py-2">
//                           <div className="flex items-center gap-1 text-[9px] font-medium uppercase tracking-wide text-slate-400">
//                             <CalendarDays className="h-3 w-3" />
//                             Expires
//                           </div>

//                           <p className="mt-0.5 truncate text-[11px] font-semibold text-slate-600">
//                             {formatDate(
//                               getExpiryDate(
//                                 announcement
//                               )
//                             )}
//                           </p>
//                         </div>
//                       </div>

//                       {/* ACTIONS */}
//                       <div className="mt-3 flex items-center gap-2 border-t border-slate-100 pt-2.5">
//                         <button
//                           type="button"
//                           onClick={() =>
//                             openEditModal(
//                               announcement
//                             )
//                           }
//                           className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white py-1.5 text-[10px] font-semibold text-slate-600 transition hover:bg-slate-50"
//                         >
//                           <Pencil className="h-3 w-3" />
//                           Edit
//                         </button>

//                         <button
//                           type="button"
//                           onClick={() =>
//                             handleDelete(
//                               announcement
//                             )
//                           }
//                           disabled={
//                             deletingId ===
//                             announcement.id
//                           }
//                           className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-red-100 bg-red-50 py-1.5 text-[10px] font-semibold text-red-600 transition hover:bg-red-100 disabled:opacity-50"
//                         >
//                           {deletingId ===
//                           announcement.id ? (
//                             <RefreshCw className="h-3 w-3 animate-spin" />
//                           ) : (
//                             <Trash2 className="h-3 w-3" />
//                           )}
//                           Delete
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* ------------------------------------------------------------------ */}
//       {/* DETAILS MODAL                                                       */}
//       {/* ------------------------------------------------------------------ */}

//       {selectedAnnouncement && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm">
//           <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
//             <div className="flex items-start justify-between border-b border-slate-100 px-5 py-4">
//               <div className="min-w-0">
//                 <h2 className="truncate text-base font-bold text-slate-800">
//                   {selectedAnnouncement.title}
//                 </h2>

//                 <div className="mt-1.5 flex items-center gap-2">
//                   <span
//                     className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${
//                       getPriorityStyles(
//                         selectedAnnouncement.priority
//                       ).bg
//                     } ${
//                       getPriorityStyles(
//                         selectedAnnouncement.priority
//                       ).text
//                     } ${
//                       getPriorityStyles(
//                         selectedAnnouncement.priority
//                       ).border
//                     }`}
//                   >
//                     {selectedAnnouncement.priority ||
//                       "Notice"}
//                   </span>

//                   <span className="text-[10px] text-slate-400">
//                     Published{" "}
//                     {formatDate(
//                       getPublishedDate(
//                         selectedAnnouncement
//                       )
//                     )}
//                   </span>
//                 </div>
//               </div>

//               <button
//                 type="button"
//                 onClick={() =>
//                   setSelectedAnnouncement(null)
//                 }
//                 className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
//               >
//                 <X className="h-4 w-4" />
//               </button>
//             </div>

//             <div className="overflow-y-auto p-5">
//               <MessageRenderer
//                 blocks={parseMessageBlocks(
//                   getMessage(selectedAnnouncement)
//                 )}
//               />

//               <div className="mt-5 grid grid-cols-2 gap-3">
//                 <div className="rounded-xl bg-slate-50 p-3">
//                   <p className="text-[10px] uppercase tracking-wide text-slate-400">
//                     Published On
//                   </p>

//                   <p className="mt-1 text-xs font-semibold text-slate-700">
//                     {formatDate(
//                       getPublishedDate(
//                         selectedAnnouncement
//                       )
//                     )}
//                   </p>
//                 </div>

//                 <div className="rounded-xl bg-slate-50 p-3">
//                   <p className="text-[10px] uppercase tracking-wide text-slate-400">
//                     Expiry Date
//                   </p>

//                   <p className="mt-1 text-xs font-semibold text-slate-700">
//                     {formatDate(
//                       getExpiryDate(
//                         selectedAnnouncement
//                       )
//                     )}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="flex justify-end gap-2 border-t border-slate-100 bg-slate-50 px-5 py-3">
//               <button
//                 type="button"
//                 onClick={() => {
//                   setSelectedAnnouncement(null);
//                   openEditModal(
//                     selectedAnnouncement
//                   );
//                 }}
//                 className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100"
//               >
//                 <Pencil className="h-3.5 w-3.5" />
//                 Edit
//               </button>

//               <button
//                 type="button"
//                 onClick={() => {
//                   const item =
//                     selectedAnnouncement;

//                   setSelectedAnnouncement(null);

//                   handleDelete(item);
//                 }}
//                 className="flex items-center gap-1.5 rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white hover:bg-red-700"
//               >
//                 <Trash2 className="h-3.5 w-3.5" />
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ------------------------------------------------------------------ */}
//       {/* CREATE / EDIT MODAL                                                 */}
//       {/* ------------------------------------------------------------------ */}

//       {showCreateModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm">
//           <div className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
//             <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
//               <div>
//                 <h2 className="text-base font-bold text-slate-800">
//                   {editingAnnouncement
//                     ? "Edit Announcement"
//                     : "Create Announcement"}
//                 </h2>

//                 <p className="mt-0.5 text-[11px] text-slate-400">
//                   Format your announcement with text and images.
//                 </p>
//               </div>

//               <button
//                 type="button"
//                 onClick={closeFormModal}
//                 disabled={saving}
//                 className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 disabled:opacity-50"
//               >
//                 <X className="h-4 w-4" />
//               </button>
//             </div>

//             <form
//               onSubmit={handleSubmit}
//               noValidate
//               className="flex min-h-0 flex-1 flex-col"
//             >
//               <div className="min-h-0 flex-1 overflow-y-auto p-5">
//                 <div className="grid gap-4 md:grid-cols-2">
//                   <div>
//                     <label className="mb-1.5 block text-xs font-semibold text-slate-600">
//                       Title
//                     </label>

//                     <input
//                       type="text"
//                       value={form.title}
//                       onChange={(e) =>
//                         setForm((prev) => ({
//                           ...prev,
//                           title: e.target.value,
//                         }))
//                       }
//                       placeholder="Enter announcement title"
//                       className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
//                     />
//                   </div>

//                   <div>
//                     <label className="mb-1.5 block text-xs font-semibold text-slate-600">
//                       Priority
//                     </label>

//                     <select
//                       value={form.priority}
//                       onChange={(e) =>
//                         setForm((prev) => ({
//                           ...prev,
//                           priority: e.target.value,
//                         }))
//                       }
//                       className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
//                     >
//                       <option value="Important">
//                         Important
//                       </option>
//                       <option value="Notice">
//                         Notice
//                       </option>
//                       <option value="General">
//                         General
//                       </option>
//                       <option value="Urgent">
//                         Urgent
//                       </option>
//                     </select>
//                   </div>

//                   <div className="md:col-span-2">
//                     <label className="mb-1.5 block text-xs font-semibold text-slate-600">
//                       Expiry Date
//                     </label>

//                     <input
//                       type="date"
//                       min={getTodayInputValue()}
//                       value={form.expiresAt}
//                       onChange={(e) =>
//                         setForm((prev) => ({
//                           ...prev,
//                           expiresAt: e.target.value,
//                         }))
//                       }
//                       className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
//                     />
//                   </div>

//                   <div className="md:col-span-2">
//                     <div className="mb-1.5 flex items-center justify-between">
//                       <label className="text-xs font-semibold text-slate-600">
//                         Message
//                       </label>

//                       <span className="text-[10px] text-slate-400">
//                         Text, formatting & images supported
//                       </span>
//                     </div>

//                     <MessageEditor
//                       blocks={messageBlocks}
//                       onChange={updateMessageBlocks}
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div className="flex justify-end gap-2 border-t border-slate-100 bg-slate-50 px-5 py-3">
//                 <button
//                   type="button"
//                   onClick={closeFormModal}
//                   disabled={saving}
//                   className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 disabled:opacity-50"
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   type="submit"
//                   disabled={saving}
//                   className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
//                 >
//                   {saving ? (
//                     <RefreshCw className="h-3.5 w-3.5 animate-spin" />
//                   ) : (
//                     <Send className="h-3.5 w-3.5" />
//                   )}

//                   {saving
//                     ? "Saving..."
//                     : editingAnnouncement
//                     ? "Update Announcement"
//                     : "Create Announcement"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* GLOBAL CUSTOM POPUP */}
//       <PopupModal
//         popup={popup}
//         onClose={closePopup}
//       />
//     </div>
//   );
// }

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  AlertCircle,
  Bell,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Image as ImageIcon,
  Info,
  Italic,
  Bold,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Upload,
  X,
  Plus,
  Pencil,
  Trash2,
  RefreshCw,
  Sparkles,
  Send,
  TriangleAlert,
} from "lucide-react";

const API_URL = import.meta.env.VITE_BACKEND_URL;

type BlockType = "text" | "image";

type MessageBlock = {
  id: string;
  type: BlockType;

  text?: string;
  imageUrl?: string;

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
  title: string;

  message?: string;
  description?: string;
  announcement?: string;

  priority?: string;

  publishedAt?: string;
  published_at?: string;
  createdAt?: string;
  created_at?: string;

  expiresAt?: string;
  expires_at?: string;
  expiryDate?: string;
  expiry_date?: string;

  organisation_id?: number;
  created_by?: number;
  is_active?: boolean;
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

const EMOJIS = [
  "😀",
  "😊",
  "🎉",
  "📢",
  "🔔",
  "⚠️",
  "✅",
  "❌",
  "⭐",
  "❤️",
  "🏠",
  "🎁",
  "📅",
  "📌",
  "🚨",
  "🙏",
];

const FONT_FAMILIES = [
  "Arial",
  "Georgia",
  "Times New Roman",
  "Verdana",
  "Trebuchet MS",
  "Courier New",
];

const FONT_SIZES = [12, 14, 16, 18, 20, 24, 28, 32];

const createTextBlock = (): MessageBlock => ({
  id: `text-${Date.now()}-${Math.random()}`,
  type: "text",
  text: "",
  color: "#1e293b",
  backgroundColor: "transparent",
  fontSize: 16,
  fontWeight: "normal",
  fontStyle: "normal",
  textAlign: "left",
  fontFamily: "Arial",
});

const createImageBlock = (imageUrl = ""): MessageBlock => ({
  id: `image-${Date.now()}-${Math.random()}`,
  type: "image",
  imageUrl,
});

const parseMessageBlocks = (message?: string): MessageBlock[] => {
  if (!message) {
    return [];
  }

  try {
    const parsed = JSON.parse(message);

    if (Array.isArray(parsed)) {
      return parsed;
    }

    if (parsed?.blocks && Array.isArray(parsed.blocks)) {
      return parsed.blocks;
    }

    if (parsed?.content && Array.isArray(parsed.content)) {
      return parsed.content;
    }
  } catch {
    // Normal text message
  }

  return [
    {
      ...createTextBlock(),
      text: message,
    },
  ];
};

const getMessage = (announcement: Announcement): string => {
  return (
    announcement.message ||
    announcement.description ||
    announcement.announcement ||
    ""
  );
};

const getPublishedDate = (announcement: Announcement): string => {
  return (
    announcement.publishedAt ||
    announcement.published_at ||
    announcement.createdAt ||
    announcement.created_at ||
    ""
  );
};

const getExpiryDate = (announcement: Announcement): string => {
  return (
    announcement.expiresAt ||
    announcement.expires_at ||
    announcement.expiryDate ||
    announcement.expiry_date ||
    ""
  );
};

const formatDate = (value?: string) => {
  if (!value) return "-";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getDateInputValue = (value?: string) => {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value.substring(0, 10);
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const getTodayInputValue = () => {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const getPriorityStyles = (priority?: string) => {
  switch ((priority || "").toLowerCase()) {
    case "important":
      return {
        bg: "bg-red-50",
        text: "text-red-600",
        border: "border-red-100",
      };

    
    case "general":
      return {
        bg: "bg-slate-50",
        text: "text-slate-600",
        border: "border-slate-100",
      };

    default:
      return {
        bg: "bg-blue-50",
        text: "text-blue-600",
        border: "border-blue-100",
      };
  }
};

const getApiResponseMessage = (
  data: any,
  fallback: string
): string => {
  if (data === null || data === undefined) {
    return fallback;
  }

  if (typeof data === "string") {
    const trimmed = data.trim();
    return trimmed || fallback;
  }

  const candidates = [
    data?.message,
    data?.msg,
    data?.error,
    data?.detail,
    data?.data?.message,
    data?.data?.msg,
    data?.data?.error,
    data?.data?.detail,
  ];

  for (const candidate of candidates) {
    if (candidate === null || candidate === undefined) continue;

    if (typeof candidate === "string") {
      const trimmed = candidate.trim();
      if (trimmed) return trimmed;
    }

    if (typeof candidate === "object") {
      try {
        return JSON.stringify(candidate);
      } catch {
        // Continue to the next candidate.
      }
    }
  }

  if (Array.isArray(data?.errors) && data.errors.length) {
    return data.errors
      .map((item: any) =>
        typeof item === "string"
          ? item
          : item?.message || item?.msg || JSON.stringify(item)
      )
      .join("\n");
  }

  if (Array.isArray(data?.data?.errors) && data.data.errors.length) {
    return data.data.errors
      .map((item: any) =>
        typeof item === "string"
          ? item
          : item?.message || item?.msg || JSON.stringify(item)
      )
      .join("\n");
  }

  try {
    const serialized = JSON.stringify(data, null, 2);
    return serialized && serialized !== "{}" ? serialized : fallback;
  } catch {
    return fallback;
  }
};

/* -------------------------------------------------------------------------- */
/* POPUP                                                                      */
/* -------------------------------------------------------------------------- */

type PopupModalProps = {
  popup: PopupState;
  onClose: () => void;
};

const PopupModal = ({ popup, onClose }: PopupModalProps) => {
  if (!popup.open) return null;

  // ONE shared popup theme for success, validation, API responses,
  // errors, image upload errors and confirmations. Only the icon changes.
  const Icon =
    popup.type === "confirm"
      ? TriangleAlert
      : popup.type === "error"
      ? AlertCircle
      : popup.type === "warning"
      ? TriangleAlert
      : popup.type === "success"
      ? CheckCircle2
      : Info;

  const iconBg = "bg-blue-50";
  const iconColor = "text-blue-600";
  const buttonClass = "bg-blue-600 hover:bg-blue-700";

  const handleConfirm = () => {
    const callback = popup.onConfirm;

    onClose();

    if (callback) {
      setTimeout(() => {
        callback();
      }, 100);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="p-5">
          <div className="flex items-start gap-3">
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${iconBg}`}
            >
              <Icon className={`h-5 w-5 ${iconColor}`} />
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="text-base font-semibold text-slate-800">
                {popup.title}
              </h3>

              <p className="mt-1.5 whitespace-pre-wrap break-words text-sm leading-5 text-slate-600">
                {popup.message}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t border-slate-100 bg-slate-50 px-5 py-3">
          {popup.type === "confirm" && (
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-100"
            >
              {popup.cancelText || "Cancel"}
            </button>
          )}

          <button
            type="button"
            onClick={
              popup.type === "confirm"
                ? handleConfirm
                : onClose
            }
            className={`rounded-lg px-4 py-2 text-xs font-semibold text-white transition ${buttonClass}`}
          >
            {popup.type === "confirm"
              ? popup.confirmText || "Confirm"
              : "OK"}
          </button>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* IMAGE UPLOAD                                                               */
/* -------------------------------------------------------------------------- */

const uploadImageFile = async (file: File): Promise<string> => {
  if (!file.type.startsWith("image/")) {
    throw new Error("Please select a valid image file.");
  }

  if (file.size > 8 * 1024 * 1024) {
    throw new Error("Image size must be less than 8 MB.");
  }

  const formData = new FormData();
  formData.append("image", file);

  const response = await axios.post(
    `${API_URL}/api/upload/image`,
    formData,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return (
    response.data?.url ||
    response.data?.imageUrl ||
    response.data?.path ||
    response.data?.data?.url ||
    ""
  );
};

/* -------------------------------------------------------------------------- */
/* EMOJI PICKER                                                               */
/* -------------------------------------------------------------------------- */

type EmojiPickerProps = {
  onSelect: (emoji: string) => void;
};

const EmojiPicker = ({ onSelect }: EmojiPickerProps) => {
  return (
    <div className="absolute left-0 top-full z-50 mt-1 w-52 rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
      <div className="grid grid-cols-8 gap-1">
        {EMOJIS.map((emoji) => (
          <button
            key={emoji}
            type="button"
            onClick={() => onSelect(emoji)}
            className="flex h-7 w-7 items-center justify-center rounded-md text-base transition hover:bg-slate-100"
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* TEXT BLOCK EDITOR                                                          */
/* -------------------------------------------------------------------------- */

type TextBlockEditorProps = {
  block: MessageBlock;
  onChange: (block: MessageBlock) => void;
  onRemove: () => void;
};

const TextBlockEditor = ({
  block,
  onChange,
  onRemove,
}: TextBlockEditorProps) => {
  const [showEmoji, setShowEmoji] = useState(false);
  const editorRef = useRef<HTMLDivElement | null>(null);
  const savedRangeRef = useRef<Range | null>(null);

  const update = (changes: Partial<MessageBlock>) => {
    onChange({
      ...block,
      ...changes,
    });
  };

  const rememberSelection = () => {
    const selection = window.getSelection();
    if (!selection || !selection.rangeCount || !editorRef.current) {
      return;
    }

    const range = selection.getRangeAt(0);
    if (editorRef.current.contains(range.commonAncestorContainer)) {
      savedRangeRef.current = range.cloneRange();
    }
  };

  const restoreSelection = () => {
    const selection = window.getSelection();
    const range = savedRangeRef.current;

    if (!selection || !range || !editorRef.current) return;

    try {
      selection.removeAllRanges();
      selection.addRange(range);
    } catch {
      // Selection may no longer be valid after a React update.
    }
  };

  const emitEditorValue = () => {
    if (!editorRef.current) return;
    update({ text: editorRef.current.innerHTML });
    rememberSelection();
  };

  const applyInlineStyle = (
    property: "color" | "fontSize" | "fontFamily",
    value: string
  ) => {
    if (!editorRef.current) return;

    editorRef.current.focus();
    restoreSelection();

    const selection = window.getSelection();
    if (!selection || !selection.rangeCount || selection.isCollapsed) {
      // If no text is selected, keep the selected value as the default
      // for the whole text block, matching the existing editor behaviour.
      if (property === "fontSize") {
        update({ fontSize: Number(value) });
      } else if (property === "fontFamily") {
        update({ fontFamily: value });
      } else {
        update({ color: value });
      }
      return;
    }

    const range = selection.getRangeAt(0);
    if (!editorRef.current.contains(range.commonAncestorContainer)) {
      return;
    }

    const wrapper = document.createElement("span");
    wrapper.style[property] = value;
    wrapper.appendChild(range.extractContents());
    range.insertNode(wrapper);

    selection.removeAllRanges();
    const newRange = document.createRange();
    newRange.selectNodeContents(wrapper);
    selection.addRange(newRange);
    savedRangeRef.current = newRange.cloneRange();

    emitEditorValue();
  };

  const toggleInlineStyle = (command: "bold" | "italic") => {
    if (!editorRef.current) return;

    editorRef.current.focus();
    restoreSelection();

    const selection = window.getSelection();
    if (!selection || !selection.rangeCount || selection.isCollapsed) {
      update(
        command === "bold"
          ? {
              fontWeight:
                block.fontWeight === "bold" ? "normal" : "bold",
            }
          : {
              fontStyle:
                block.fontStyle === "italic" ? "normal" : "italic",
            }
      );
      return;
    }

    document.execCommand(command, false);
    emitEditorValue();
  };

  const setAlignment = (textAlign: "left" | "center" | "right") => {
    update({ textAlign });
  };

  useEffect(() => {
    if (!editorRef.current) return;

    // Do not replace innerHTML while the user is typing/selecting.
    if (document.activeElement !== editorRef.current) {
      const value = block.text || "";
      const looksLikeHtml = /<([a-z][^>]*?)>/i.test(value);

      editorRef.current.innerHTML = looksLikeHtml
        ? value
        : value
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/\n/g, "<br />");
    }
  }, [block.text]);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-600">
          Text
        </span>

        <button
          type="button"
          onClick={onRemove}
          className="rounded-md p-1 text-slate-400 hover:bg-red-50 hover:text-red-500"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={emitEditorValue}
        onMouseUp={rememberSelection}
        onKeyUp={rememberSelection}
        onFocus={rememberSelection}
        data-placeholder="Write announcement message..."
        className="min-h-[104px] w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100 empty:before:pointer-events-none empty:before:text-slate-400 empty:before:content-[attr(data-placeholder)]"
        style={{
          fontFamily: block.fontFamily || "Arial",
          fontSize: `${block.fontSize || 16}px`,
          color: block.color || "#1e293b",
          fontWeight: block.fontWeight || "normal",
          fontStyle: block.fontStyle || "normal",
          textAlign: block.textAlign || "left",
          whiteSpace: "pre-wrap",
        }}
      />

      <div className="mt-2 flex flex-wrap items-center gap-1.5">
        <select
          value={block.fontFamily || "Arial"}
          onMouseDown={rememberSelection}
          onChange={(e) =>
            applyInlineStyle("fontFamily", e.target.value)
          }
          className="h-8 rounded-md border border-slate-200 bg-white px-2 text-[11px] text-slate-600 outline-none"
        >
          {FONT_FAMILIES.map((font) => (
            <option key={font} value={font}>
              {font}
            </option>
          ))}
        </select>

        <select
          value={block.fontSize || 16}
          onMouseDown={rememberSelection}
          onChange={(e) =>
            applyInlineStyle("fontSize", `${Number(e.target.value)}px`)
          }
          className="h-8 rounded-md border border-slate-200 bg-white px-2 text-[11px] text-slate-600 outline-none"
        >
          {FONT_SIZES.map((size) => (
            <option key={size} value={size}>
              {size}px
            </option>
          ))}
        </select>

        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            rememberSelection();
            toggleInlineStyle("bold");
          }}
          className={`flex h-8 w-8 items-center justify-center rounded-md border ${
            block.fontWeight === "bold"
              ? "border-blue-200 bg-blue-50 text-blue-600"
              : "border-slate-200 text-slate-500"
          }`}
        >
          <Bold className="h-3.5 w-3.5" />
        </button>

        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            rememberSelection();
            toggleInlineStyle("italic");
          }}
          className={`flex h-8 w-8 items-center justify-center rounded-md border ${
            block.fontStyle === "italic"
              ? "border-blue-200 bg-blue-50 text-blue-600"
              : "border-slate-200 text-slate-500"
          }`}
        >
          <Italic className="h-3.5 w-3.5" />
        </button>

        <button
          type="button"
          onClick={() => setAlignment("left")}
          className={`flex h-8 w-8 items-center justify-center rounded-md border ${
            block.textAlign === "left"
              ? "border-blue-200 bg-blue-50 text-blue-600"
              : "border-slate-200 text-slate-500"
          }`}
        >
          <AlignLeft className="h-3.5 w-3.5" />
        </button>

        <button
          type="button"
          onClick={() => setAlignment("center")}
          className={`flex h-8 w-8 items-center justify-center rounded-md border ${
            block.textAlign === "center"
              ? "border-blue-200 bg-blue-50 text-blue-600"
              : "border-slate-200 text-slate-500"
          }`}
        >
          <AlignCenter className="h-3.5 w-3.5" />
        </button>

        <button
          type="button"
          onClick={() => setAlignment("right")}
          className={`flex h-8 w-8 items-center justify-center rounded-md border ${
            block.textAlign === "right"
              ? "border-blue-200 bg-blue-50 text-blue-600"
              : "border-slate-200 text-slate-500"
          }`}
        >
          <AlignRight className="h-3.5 w-3.5" />
        </button>

        <div className="relative">
          <button
            type="button"
            onClick={() => setShowEmoji((prev) => !prev)}
            className="flex h-8 items-center gap-1 rounded-md border border-slate-200 px-2 text-xs text-slate-500 hover:bg-slate-50"
          >
            😊
          </button>

          {showEmoji && (
            <EmojiPicker
              onSelect={(emoji) => {
                if (editorRef.current) {
                  editorRef.current.focus();
                  restoreSelection();
                  document.execCommand("insertText", false, emoji);
                  emitEditorValue();
                }
                setShowEmoji(false);
              }}
            />
          )}
        </div>

        <label
          className="flex h-8 cursor-pointer items-center gap-1 rounded-md border border-slate-200 px-2 text-xs text-slate-500 hover:bg-slate-50"
          title="Text color"
        >
          <span
            className="h-4 w-4 rounded border border-slate-200"
            style={{
              backgroundColor: block.color || "#1e293b",
            }}
          />
          <input
            type="color"
            value={block.color || "#1e293b"}
            onMouseDown={rememberSelection}
            onChange={(e) => {
              const value = e.target.value;
              applyInlineStyle("color", value);
            }}
            className="absolute h-0 w-0 opacity-0"
          />
        </label>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* IMAGE BLOCK EDITOR                                                         */
/* -------------------------------------------------------------------------- */

type ImageBlockEditorProps = {
  block: MessageBlock;
  onChange: (block: MessageBlock) => void;
  onRemove: () => void;
};

const ImageBlockEditor = ({
  block,
  onChange,
  onRemove,
}: ImageBlockEditorProps) => {
  const [uploading, setUploading] = useState(false);

  const handleFile = async (file?: File) => {
    if (!file) return;

    try {
      setUploading(true);

      const url = await uploadImageFile(file);

      if (!url) {
        throw new Error("Image URL was not returned by the server.");
      }

      onChange({
        ...block,
        imageUrl: url,
      });
    } catch (error: any) {
      window.dispatchEvent(
        new CustomEvent("announcement-upload-error", {
          detail:
            error?.response?.data?.message ||
            error?.message ||
            "Unable to upload image.",
        })
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-600">
          Image / Banner
        </span>

        <button
          type="button"
          onClick={onRemove}
          className="rounded-md p-1 text-slate-400 hover:bg-red-50 hover:text-red-500"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {block.imageUrl ? (
        <div className="relative overflow-hidden rounded-lg border border-slate-200">
          <img
            src={block.imageUrl}
            alt="Announcement"
            className="max-h-52 w-full object-contain"
          />

          <label className="absolute bottom-2 right-2 flex cursor-pointer items-center gap-1 rounded-lg bg-white/95 px-2.5 py-1.5 text-xs font-medium text-slate-600 shadow">
            <Upload className="h-3.5 w-3.5" />
            Replace
            <input
              type="file"
              accept="image/png,image/jpeg,image/gif,image/webp"
              className="hidden"
              onChange={(e) =>
                handleFile(e.target.files?.[0])
              }
            />
          </label>
        </div>
      ) : (
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center transition hover:bg-slate-100">
          {uploading ? (
            <>
              <RefreshCw className="h-6 w-6 animate-spin text-blue-500" />
              <p className="mt-2 text-xs text-slate-500">
                Uploading...
              </p>
            </>
          ) : (
            <>
              <ImageIcon className="h-7 w-7 text-slate-400" />
              <p className="mt-2 text-xs font-medium text-slate-600">
                Click to upload image
              </p>
              <p className="mt-1 text-[10px] text-slate-400">
                PNG, JPG, GIF or WebP • Max 8 MB
              </p>
            </>
          )}

          <input
            type="file"
            accept="image/png,image/jpeg,image/gif,image/webp"
            className="hidden"
            onChange={(e) =>
              handleFile(e.target.files?.[0])
            }
          />
        </label>
      )}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* MESSAGE EDITOR                                                             */
/* -------------------------------------------------------------------------- */

type MessageEditorProps = {
  blocks: MessageBlock[];
  onChange: (blocks: MessageBlock[]) => void;
};

const MessageEditor = ({
  blocks,
  onChange,
}: MessageEditorProps) => {
  const updateBlock = (
    index: number,
    block: MessageBlock
  ) => {
    const next = [...blocks];
    next[index] = block;
    onChange(next);
  };

  const removeBlock = (index: number) => {
    onChange(blocks.filter((_, i) => i !== index));
  };

  const addTextBlock = () => {
    onChange([...blocks, createTextBlock()]);
  };

  const addImageBlock = () => {
    onChange([...blocks, createImageBlock()]);
  };

  return (
    <div className="space-y-2">
      {blocks.length === 0 && (
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-7 text-center">
          <Sparkles className="mx-auto h-7 w-7 text-slate-300" />

          <p className="mt-2 text-sm font-medium text-slate-500">
            Start creating your announcement
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Add text, formatting or an image/banner.
          </p>
        </div>
      )}

      {blocks.map((block, index) =>
        block.type === "image" ? (
          <ImageBlockEditor
            key={block.id}
            block={block}
            onChange={(updated) =>
              updateBlock(index, updated)
            }
            onRemove={() => removeBlock(index)}
          />
        ) : (
          <TextBlockEditor
            key={block.id}
            block={block}
            onChange={(updated) =>
              updateBlock(index, updated)
            }
            onRemove={() => removeBlock(index)}
          />
        )
      )}

      <div className="flex flex-wrap gap-2 pt-1">
        <button
          type="button"
          onClick={addTextBlock}
          className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-50"
        >
          <Plus className="h-3.5 w-3.5" />
          Add Text
        </button>

        <button
          type="button"
          onClick={addImageBlock}
          className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-50"
        >
          <ImageIcon className="h-3.5 w-3.5" />
          Add Image
        </button>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* MESSAGE RENDERER                                                           */
/* -------------------------------------------------------------------------- */

type MessageRendererProps = {
  blocks: MessageBlock[];
  compact?: boolean;
};

const MessageRenderer = ({
  blocks,
  compact = false,
}: MessageRendererProps) => {
  if (!blocks.length) {
    return (
      <span className="text-slate-400">
        No message available
      </span>
    );
  }

  return (
    <div className={compact ? "space-y-1.5" : "space-y-3"}>
      {blocks.map((block) => {
        if (block.type === "image" && block.imageUrl) {
          return (
            <img
              key={block.id}
              src={block.imageUrl}
              alt="Announcement"
              className={
                compact
                  ? "max-h-28 w-full rounded-lg object-cover"
                  : "max-h-80 w-full rounded-xl object-contain"
              }
            />
          );
        }

        if (block.type === "text") {
          const fontSize = compact
            ? Math.min(Number(block.fontSize || 16), 14)
            : Number(block.fontSize || 16);

          return (
            <div
              key={block.id}
              className="whitespace-pre-wrap break-words"
              style={{
                color: block.color || "#1e293b",
                backgroundColor:
                  block.backgroundColor &&
                  block.backgroundColor !== "transparent"
                    ? block.backgroundColor
                    : undefined,
                fontSize,
                fontWeight:
                  block.fontWeight || "normal",
                fontStyle:
                  block.fontStyle || "normal",
                textAlign:
                  block.textAlign || "left",
                fontFamily:
                  block.fontFamily || "Arial",
                lineHeight: compact ? 1.45 : 1.6,
              }}
            >
              {/<[a-z][\s\S]*>/i.test(block.text || "") ? (
                <span
                  dangerouslySetInnerHTML={{
                    __html: block.text || "",
                  }}
                />
              ) : (
                block.text
              )}
            </div>
          );
        }

        return null;
      })}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* MAIN COMPONENT                                                             */
/* -------------------------------------------------------------------------- */

export default function Announcements() {
  const [announcements, setAnnouncements] = useState<
    Announcement[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [selectedAnnouncement, setSelectedAnnouncement] =
    useState<Announcement | null>(null);

  const [showCreateModal, setShowCreateModal] =
    useState(false);

  const [editingAnnouncement, setEditingAnnouncement] =
    useState<Announcement | null>(null);

  const [form, setForm] = useState<AnnouncementForm>({
    title: "",
    message: "",
    priority: "Notice",
    expiresAt: "",
  });

  const [messageBlocks, setMessageBlocks] = useState<
    MessageBlock[]
  >([]);

  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(
    null
  );

  const [popup, setPopup] = useState<PopupState>({
    open: false,
    type: "info",
    title: "",
    message: "",
  });

  /* ------------------------------------------------------------------------ */
  /* POPUP HELPERS                                                            */
  /* ------------------------------------------------------------------------ */

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
    setPopup((prev) => ({
      ...prev,
      open: false,
    }));
  };

  const showApiError = (error: any, fallback: string) => {
    const message = getApiResponseMessage(
      error?.response?.data ?? error?.data,
      error?.message || fallback
    );

    showPopup("error", "API Response", message);
  };

  /* ------------------------------------------------------------------------ */
  /* FETCH                                                                    */
  /* ------------------------------------------------------------------------ */

  const fetchAnnouncements = async () => {
    try {

      const response = await axios.get(
        `${API_URL}/api/admin/announcements`,
        {
          withCredentials: true,
        }
      );

      const data = response.data;

      const list =
        Array.isArray(data)
          ? data
          : Array.isArray(data?.announcements)
          ? data.announcements
          : Array.isArray(data?.data)
          ? data.data
          : [];

      setAnnouncements(list);
    } catch (err: any) {
      const message = getApiResponseMessage(
        err?.response?.data,
        err?.message || "Unable to fetch announcements."
      );

      showPopup(
        "error",
        "API Response",
        message
      );
    }
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      await fetchAnnouncements();

      setLoading(false);
    };

    load();
  }, []);

  /* ------------------------------------------------------------------------ */
  /* CREATE                                                                    */
  /* ------------------------------------------------------------------------ */

  const openCreateModal = () => {
    setEditingAnnouncement(null);

    setForm({
      title: "",
      message: "",
      priority: "Notice",
      expiresAt: "",
    });

    setMessageBlocks([
      createTextBlock(),
    ]);

    setShowCreateModal(true);
  };

  /* ------------------------------------------------------------------------ */
  /* EDIT                                                                      */
  /* ------------------------------------------------------------------------ */

  const openEditModal = (
    announcement: Announcement
  ) => {
    setEditingAnnouncement(announcement);

    setForm({
      title: announcement.title || "",
      message: getMessage(announcement),
      priority: announcement.priority || "Notice",
      expiresAt: getDateInputValue(
        getExpiryDate(announcement)
      ),
    });

    setMessageBlocks(
      parseMessageBlocks(getMessage(announcement))
    );

    setShowCreateModal(true);
  };

  const closeFormModal = () => {
    if (saving) return;

    setShowCreateModal(false);
    setEditingAnnouncement(null);
  };

  /* ------------------------------------------------------------------------ */
  /* MESSAGE BLOCKS                                                            */
  /* ------------------------------------------------------------------------ */

  const updateMessageBlocks = (
    blocks: MessageBlock[]
  ) => {
    setMessageBlocks(blocks);

    setForm((prev) => ({
      ...prev,
      message: JSON.stringify(blocks),
    }));
  };

  const hasMessageContent = () => {
    return messageBlocks.some((block) => {
      if (block.type === "image") {
        return Boolean(block.imageUrl);
      }

      return Boolean(block.text?.trim());
    });
  };

  /* ------------------------------------------------------------------------ */
  /* SUBMIT                                                                    */
  /* ------------------------------------------------------------------------ */

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!form.title.trim()) {
      showPopup(
        "warning",
        "Validation",
        "Please enter an announcement title."
      );
      return;
    }

    if (!hasMessageContent()) {
      showPopup(
        "warning",
        "Validation",
        "Please enter an announcement message or add an image."
      );
      return;
    }

    if (!form.expiresAt) {
      showPopup(
        "warning",
        "Validation",
        "Please select an expiry date."
      );
      return;
    }

    const today = getTodayInputValue();

    if (form.expiresAt < today) {
      showPopup(
        "warning",
        "Invalid Expiry Date",
        "Expiry date cannot be earlier than today."
      );
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

      let response;

      if (editingAnnouncement) {
        response = await axios.put(
          `${API_URL}/api/admin/announcements/${editingAnnouncement.id}`,
          payload,
          {
            withCredentials: true,
          }
        );
      } else {
        response = await axios.post(
          `${API_URL}/api/admin/announcements`,
          payload,
          {
            withCredentials: true,
          }
        );
      }

      const apiMessage = getApiResponseMessage(
        response.data,
        editingAnnouncement
          ? "Announcement updated successfully."
          : "Announcement created successfully."
      );

      setShowCreateModal(false);
      setEditingAnnouncement(null);

      await fetchAnnouncements();

      showPopup(
        "success",
        "Announcement",
        apiMessage
      );
    } catch (err: any) {
      showApiError(
        err,
        editingAnnouncement
          ? "Unable to update announcement."
          : "Unable to create announcement."
      );
    } finally {
      setSaving(false);
    }
  };

  /* ------------------------------------------------------------------------ */
  /* DELETE                                                                    */
  /* ------------------------------------------------------------------------ */

  const performDelete = async (id: number) => {
    try {
      setDeletingId(id);

      const response = await axios.delete(
        `${API_URL}/api/admin/announcements/${id}`,
        {
          withCredentials: true,
        }
      );

      const apiMessage = getApiResponseMessage(
        response.data,
        "Announcement deleted successfully."
      );

      setAnnouncements((prev) =>
        prev.filter((item) => item.id !== id)
      );

      if (selectedAnnouncement?.id === id) {
        setSelectedAnnouncement(null);
      }

      showPopup(
        "success",
        "Announcement",
        apiMessage
      );
    } catch (err: any) {
      showApiError(
        err,
        "Unable to delete announcement."
      );
    } finally {
      setDeletingId(null);
    }
  };

  const handleDelete = (
    announcement: Announcement
  ) => {
    showPopup(
      "confirm",
      "Delete Announcement",
      `Are you sure you want to delete "${announcement.title}"?`,
      {
        confirmText: "Delete",
        cancelText: "Cancel",
        onConfirm: () =>
          performDelete(announcement.id),
      }
    );
  };

  /* ------------------------------------------------------------------------ */
  /* REFRESH                                                                   */
  /* ------------------------------------------------------------------------ */

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      await fetchAnnouncements();
    } finally {
      setRefreshing(false);
    }
  };

  /* ------------------------------------------------------------------------ */
  /* UPLOAD ERROR EVENT                                                        */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    const handler = (event: Event) => {
      const customEvent = event as CustomEvent;

      showPopup(
        "error",
        "Image Upload",
        getApiResponseMessage(
          customEvent.detail,
          "Unable to upload image."
        )
      );
    };

    window.addEventListener(
      "announcement-upload-error",
      handler
    );

    return () => {
      window.removeEventListener(
        "announcement-upload-error",
        handler
      );
    };
  }, []);

  /* ------------------------------------------------------------------------ */
  /* RENDER                                                                    */
  /* ------------------------------------------------------------------------ */

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 sm:p-6">
      <div className="mx-auto max-w-[1450px]">
        {/* PAGE HEADER */}
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 shadow-sm">
                <Bell className="h-4.5 w-4.5 text-white" />
              </div>

              <div>
                <h1 className="text-xl font-bold tracking-tight text-slate-800">
                  Announcements
                </h1>

                <p className="text-xs text-slate-500">
                  Create and manage announcements for your apartment members
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={openCreateModal}
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            Create Announcement
          </button>
        </div>

        {/* MAIN CARD */}
        <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-sm backdrop-blur-sm sm:p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-semibold text-slate-800">
                  Published Announcements
                </h2>

                <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-600">
                  {announcements.length}
                </span>
              </div>

              <p className="mt-0.5 text-[11px] text-slate-400">
                Manage announcements sent to apartment members
              </p>
            </div>

            <button
              type="button"
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 disabled:opacity-50"
              title="Refresh"
            >
              <RefreshCw
                className={`h-3.5 w-3.5 ${
                  refreshing ? "animate-spin" : ""
                }`}
              />
            </button>
          </div>

          {/* LOADING */}
          {loading ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="aspect-square max-h-[360px] w-full animate-pulse rounded-2xl border border-slate-200 bg-slate-50"
                />
              ))}
            </div>
          ) : announcements.length === 0 ? (
            /* EMPTY */
            <div className="flex min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/60 px-4 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
                <Bell className="h-5 w-5 text-blue-500" />
              </div>

              <h3 className="mt-3 text-sm font-semibold text-slate-700">
                No announcements yet
              </h3>

              <p className="mt-1 max-w-sm text-xs text-slate-400">
                Create your first announcement to share information with apartment members.
              </p>

              <button
                type="button"
                onClick={openCreateModal}
                className="mt-4 flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-blue-700"
              >
                <Plus className="h-3.5 w-3.5" />
                Create Announcement
              </button>
            </div>
          ) : (
            /* ANNOUNCEMENT GRID */
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {announcements.map((announcement) => {
                const priorityStyles =
                  getPriorityStyles(
                    announcement.priority
                  );

                const blocks = parseMessageBlocks(
                  getMessage(announcement)
                );

                return (
                  <div
                    key={announcement.id}
                    className="group relative mx-auto flex aspect-square w-full max-w-[360px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    {/* TOP ACCENT */}
                    <div
                      className={`h-1 w-full ${
                        (announcement.priority || "")
                          .toLowerCase() === "important"
                          ? "bg-red-500"
                          : "bg-blue-500"
                      }`}
                    />

                    <div className="flex min-h-0 flex-1 flex-col p-3.5">
                      {/* HEADER */}
                      <div className="flex items-start gap-2">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50">
                          <Bell className="h-3.5 w-3.5 text-blue-600" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <h3
                            className="truncate text-sm font-semibold text-slate-800"
                            title={announcement.title}
                          >
                            {announcement.title}
                          </h3>

                          <div className="mt-1">
                            <span
                              className={`inline-flex rounded-full border px-2 py-0.5 text-[9px] font-semibold ${priorityStyles.bg} ${priorityStyles.text} ${priorityStyles.border}`}
                            >
                              {announcement.priority ||
                                "Notice"}
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            setSelectedAnnouncement(
                              announcement
                            )
                          }
                          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                          title="View details"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>

                      {/* MESSAGE */}
                      <div className="mt-3 min-h-0 flex-1 overflow-hidden rounded-lg bg-slate-50/70 p-2.5">
                       {/* <div className="mt-2 max-h-[95px] overflow-hidden rounded-lg bg-slate-50/70 p-2"> */}
                        <div className="line-clamp-5 max-h-[105px] overflow-hidden text-[13px] leading-5 text-slate-600">
                          <MessageRenderer
                            blocks={blocks}
                            compact
                          />
                        </div>
                      </div>

                      {/* DATES */}
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <div className="rounded-lg bg-slate-50 px-2.5 py-2">
                          <div className="flex items-center gap-1 text-[9px] font-medium uppercase tracking-wide text-slate-400">
                            <CalendarDays className="h-3 w-3" />
                            Published
                          </div>

                          <p className="mt-0.5 truncate text-[11px] font-semibold text-slate-600">
                            {formatDate(
                              getPublishedDate(
                                announcement
                              )
                            )}
                          </p>
                        </div>

                        <div className="rounded-lg bg-slate-50 px-2.5 py-2">
                          <div className="flex items-center gap-1 text-[9px] font-medium uppercase tracking-wide text-slate-400">
                            <CalendarDays className="h-3 w-3" />
                            Expires
                          </div>

                          <p className="mt-0.5 truncate text-[11px] font-semibold text-slate-600">
                            {formatDate(
                              getExpiryDate(
                                announcement
                              )
                            )}
                          </p>
                        </div>
                      </div>

                      {/* ACTIONS */}
                      <div className="mt-3 flex items-center gap-2 border-t border-slate-100 pt-2.5">
                        <button
                          type="button"
                          onClick={() =>
                            openEditModal(
                              announcement
                            )
                          }
                          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white py-1.5 text-[10px] font-semibold text-slate-600 transition hover:bg-slate-50"
                        >
                          <Pencil className="h-3 w-3" />
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(
                              announcement
                            )
                          }
                          disabled={
                            deletingId ===
                            announcement.id
                          }
                          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-red-100 bg-red-50 py-1.5 text-[10px] font-semibold text-red-600 transition hover:bg-red-100 disabled:opacity-50"
                        >
                          {deletingId ===
                          announcement.id ? (
                            <RefreshCw className="h-3 w-3 animate-spin" />
                          ) : (
                            <Trash2 className="h-3 w-3" />
                          )}
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* DETAILS MODAL                                                       */}
      {/* ------------------------------------------------------------------ */}

      {selectedAnnouncement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm">
          <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-100 px-5 py-4">
              <div className="min-w-0">
                <h2 className="truncate text-base font-bold text-slate-800">
                  {selectedAnnouncement.title}
                </h2>

                <div className="mt-1.5 flex items-center gap-2">
                  <span
                    className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${
                      getPriorityStyles(
                        selectedAnnouncement.priority
                      ).bg
                    } ${
                      getPriorityStyles(
                        selectedAnnouncement.priority
                      ).text
                    } ${
                      getPriorityStyles(
                        selectedAnnouncement.priority
                      ).border
                    }`}
                  >
                    {selectedAnnouncement.priority ||
                      "Notice"}
                  </span>

                  <span className="text-[10px] text-slate-400">
                    Published{" "}
                    {formatDate(
                      getPublishedDate(
                        selectedAnnouncement
                      )
                    )}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedAnnouncement(null)
                }
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="overflow-y-auto p-5">
              <MessageRenderer
                blocks={parseMessageBlocks(
                  getMessage(selectedAnnouncement)
                )}
              />

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-[10px] uppercase tracking-wide text-slate-400">
                    Published On
                  </p>

                  <p className="mt-1 text-xs font-semibold text-slate-700">
                    {formatDate(
                      getPublishedDate(
                        selectedAnnouncement
                      )
                    )}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-[10px] uppercase tracking-wide text-slate-400">
                    Expiry Date
                  </p>

                  <p className="mt-1 text-xs font-semibold text-slate-700">
                    {formatDate(
                      getExpiryDate(
                        selectedAnnouncement
                      )
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 border-t border-slate-100 bg-slate-50 px-5 py-3">
              <button
                type="button"
                onClick={() => {
                  setSelectedAnnouncement(null);
                  openEditModal(
                    selectedAnnouncement
                  );
                }}
                className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                <Pencil className="h-3.5 w-3.5" />
                Edit
              </button>

              <button
                type="button"
                onClick={() => {
                  const item =
                    selectedAnnouncement;

                  setSelectedAnnouncement(null);

                  handleDelete(item);
                }}
                className="flex items-center gap-1.5 rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white hover:bg-red-700"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* CREATE / EDIT MODAL                                                 */}
      {/* ------------------------------------------------------------------ */}

      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm">
          <div className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div>
                <h2 className="text-base font-bold text-slate-800">
                  {editingAnnouncement
                    ? "Edit Announcement"
                    : "Create Announcement"}
                </h2>

                <p className="mt-0.5 text-[11px] text-slate-400">
                  Format your announcement with text and images.
                </p>
              </div>

              <button
                type="button"
                onClick={closeFormModal}
                disabled={saving}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 disabled:opacity-50"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex min-h-0 flex-1 flex-col"
            >
              <div className="min-h-0 flex-1 overflow-y-auto p-5">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                      Title
                    </label>

                    <input
                      type="text"
                      value={form.title}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                      placeholder="Enter announcement title"
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                      Priority
                    </label>

                    <select
                      value={form.priority}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          priority: e.target.value,
                        }))
                      }
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                    >
                      <option value="Important">
                        Important
                      </option>
                      <option value="Notice">
                        Notice
                      </option>
                      <option value="General">
                        General
                      </option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                      Expiry Date
                    </label>

                    <input
                      type="date"
                      min={getTodayInputValue()}
                      value={form.expiresAt}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          expiresAt: e.target.value,
                        }))
                      }
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <div className="mb-1.5 flex items-center justify-between">
                      <label className="text-xs font-semibold text-slate-600">
                        Message
                      </label>

                      <span className="text-[10px] text-slate-400">
                        Text, formatting & images supported
                      </span>
                    </div>

                    <MessageEditor
                      blocks={messageBlocks}
                      onChange={updateMessageBlocks}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 border-t border-slate-100 bg-slate-50 px-5 py-3">
                <button
                  type="button"
                  onClick={closeFormModal}
                  disabled={saving}
                  className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? (
                    <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Send className="h-3.5 w-3.5" />
                  )}

                  {saving
                    ? "Saving..."
                    : editingAnnouncement
                    ? "Update Announcement"
                    : "Create Announcement"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* GLOBAL CUSTOM POPUP */}
      <PopupModal
        popup={popup}
        onClose={closePopup}
      />
    </div>
  );
}

