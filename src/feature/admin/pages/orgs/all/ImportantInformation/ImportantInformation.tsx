// import { useEffect, useMemo, useState } from "react";
// import axios from "axios";
// import {
//   AlertCircle,
//   AlertTriangle,
//   CheckCircle2,
//   Eye,
//   Edit,
//   Minus,
//   Pencil,
//   Plus,
//   Trash2,
//   X,
//   XCircle,
// } from "lucide-react";

// const API = import.meta.env.VITE_BACKEND_URL;

// const MAX_CONTACTS = 10;

// type InformationType = "emergency" | "community";

// type Contact = {
//   id: string;
//   designation: string;
//   name: string;
//   contactNo: string;
//   isEditing: boolean;
// };

// type InformationPayload = {
//   informationType: InformationType;
//   contacts: {
//     designation: string;
//     name: string;
//     contactNo: string;
//   }[];
// };

// type Information = {
//   id: number;
//   title: string;
//   description: string;
//   created_at: string;
//   updated_at?: string;
//   status?: "published" | "draft";
//   priority?: string;
//   expires_at?: string | null;
//   is_active?: boolean;
// };

// /*
// |--------------------------------------------------------------------------
// | ALERT TYPES
// |--------------------------------------------------------------------------
// */

// type AlertType = "success" | "warning" | "error";

// type AlertState = {
//   type: AlertType;
//   message: string;
//   confirmText?: string;
//   cancelText?: string;
//   onConfirm?: () => void;
// };

// /*
// |--------------------------------------------------------------------------
// | CONTACT
// |--------------------------------------------------------------------------
// */

// const createContact = (): Contact => ({
//   id: `${Date.now()}-${Math.random()}`,
//   designation: "",
//   name: "",
//   contactNo: "",
//   isEditing: true,
// });

// /*
// |--------------------------------------------------------------------------
// | API RESPONSE MESSAGE
// |--------------------------------------------------------------------------
// */

// const getApiResponseMessage = (
//   data: any,
//   fallback: string
// ): string => {
//   if (!data) {
//     return fallback;
//   }

//   if (typeof data === "string") {
//     return data;
//   }

//   const directMessage =
//     data.message ||
//     data.msg ||
//     data.error ||
//     data.detail;

//   if (typeof directMessage === "string") {
//     return directMessage;
//   }

//   if (data.data) {
//     const nestedMessage =
//       data.data.message ||
//       data.data.msg ||
//       data.data.error ||
//       data.data.detail;

//     if (typeof nestedMessage === "string") {
//       return nestedMessage;
//     }
//   }

//   if (Array.isArray(data.errors)) {
//     const messages = data.errors
//       .map((item: any) => {
//         if (typeof item === "string") {
//           return item;
//         }

//         return (
//           item?.message ||
//           item?.msg ||
//           item?.error ||
//           item?.detail ||
//           ""
//         );
//       })
//       .filter(Boolean);

//     if (messages.length > 0) {
//       return messages.join("\n");
//     }
//   }

//   return fallback;
// };

// /*
// |--------------------------------------------------------------------------
// | PARSE STORED DESCRIPTION
// |--------------------------------------------------------------------------
// */

// const parseDescription = (
//   description: string
// ): {
//   informationType: InformationType;
//   contacts: Contact[];
//   isLegacy: boolean;
// } => {
//   if (!description) {
//     return {
//       informationType: "community",
//       contacts: [],
//       isLegacy: false,
//     };
//   }

//   try {
//     const parsed = JSON.parse(description);

//     if (
//       parsed &&
//       (parsed.informationType === "emergency" ||
//         parsed.informationType === "community") &&
//       Array.isArray(parsed.contacts)
//     ) {
//       return {
//         informationType: parsed.informationType,
//         contacts: parsed.contacts.map(
//           (
//             contact: {
//               designation?: string;
//               name?: string;
//               contactNo?: string;
//             },
//             index: number
//           ) => ({
//             id: `existing-${index}-${Date.now()}-${Math.random()}`,
//             designation: contact.designation || "",
//             name: contact.name || "",
//             contactNo: contact.contactNo || "",
//             isEditing: false,
//           })
//         ),
//         isLegacy: false,
//       };
//     }
//   } catch {
//     // Old records may contain plain text/html.
//   }

//   return {
//     informationType: "community",
//     contacts: [],
//     isLegacy: true,
//   };
// };

// /*
// |--------------------------------------------------------------------------
// | BUILD PAYLOAD
// |--------------------------------------------------------------------------
// */

// const buildDescription = (
//   informationType: InformationType,
//   contacts: Contact[]
// ) => {
//   const payload: InformationPayload = {
//     informationType,
//     contacts: contacts.map((contact) => ({
//       designation: contact.designation.trim(),
//       name: contact.name.trim(),
//       contactNo: contact.contactNo.trim(),
//     })),
//   };

//   return JSON.stringify(payload);
// };

// const ImportantInformation = () => {
//   const [information, setInformation] = useState<Information[]>([]);

//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);

//   const [showModal, setShowModal] = useState(false);
//   const [showViewModal, setShowViewModal] = useState(false);

//   const [editingId, setEditingId] = useState<number | null>(null);

//   const [selectedInformation, setSelectedInformation] =
//     useState<Information | null>(null);

//   /*
//   |--------------------------------------------------------------------------
//   | FORM STATE
//   |--------------------------------------------------------------------------
//   */

//   const [title, setTitle] = useState("");

//   const [informationType, setInformationType] =
//     useState<InformationType>("emergency");

//   const [contacts, setContacts] = useState<Contact[]>([]);

//   /*
//   |--------------------------------------------------------------------------
//   | ERRORS
//   |--------------------------------------------------------------------------
//   */

//   const [titleError, setTitleError] = useState("");
//   const [typeError, setTypeError] = useState("");
//   const [contactsError, setContactsError] = useState("");

//   const [contactErrors, setContactErrors] = useState<
//     Record<
//       string,
//       {
//         designation?: string;
//         name?: string;
//         contactNo?: string;
//       }
//     >
//   >({});

//   /*
//   |--------------------------------------------------------------------------
//   | ANNOUNCEMENT-STYLE ALERT
//   |--------------------------------------------------------------------------
//   */

//   const [alert, setAlert] =
//     useState<AlertState | null>(null);

//   const showAlert = (
//     type: AlertType,
//     message: string,
//     options?: {
//       confirmText?: string;
//       cancelText?: string;
//       onConfirm?: () => void;
//     }
//   ) => {
//     setAlert({
//       type,
//       message,
//       ...options,
//     });
//   };

//   const closeAlert = () => {
//     setAlert(null);
//   };

//   /*
//   |--------------------------------------------------------------------------
//   | API ERROR POPUP
//   |--------------------------------------------------------------------------
//   */

//   const showApiError = (
//     error: any,
//     fallback: string
//   ) => {
//     const message = getApiResponseMessage(
//       error?.response?.data ?? error?.data,
//       error?.message || fallback
//     );

//     showAlert("error", message);
//   };

//   /*
//   |--------------------------------------------------------------------------
//   | DETERMINE EXISTING INFORMATION TYPES
//   |--------------------------------------------------------------------------
//   */

//   const existingInformationTypes = useMemo(() => {
//     const types = new Set<InformationType>();

//     information.forEach((item) => {
//       const parsed = parseDescription(item.description);

//       if (!parsed.isLegacy) {
//         types.add(parsed.informationType);
//       }
//     });

//     return types;
//   }, [information]);

//   const hasEmergencyInformation =
//     existingInformationTypes.has("emergency");

//   const hasCommunityInformation =
//     existingInformationTypes.has("community");

//   const canAddEmergency = !hasEmergencyInformation;
//   const canAddCommunity = !hasCommunityInformation;

//   const canAddInformation =
//     canAddEmergency || canAddCommunity;

//   /*
//   |--------------------------------------------------------------------------
//   | GET DEFAULT TYPE
//   |--------------------------------------------------------------------------
//   */

//   const getNextInformationType = (): InformationType => {
//     if (
//       hasEmergencyInformation &&
//       !hasCommunityInformation
//     ) {
//       return "community";
//     }

//     if (
//       hasCommunityInformation &&
//       !hasEmergencyInformation
//     ) {
//       return "emergency";
//     }

//     return "emergency";
//   };

//   /*
//   |--------------------------------------------------------------------------
//   | FETCH
//   |--------------------------------------------------------------------------
//   */

//   const fetchInformation = async (
//     showErrorPopup = true
//   ) => {
//     try {
//       setLoading(true);

//       const response = await axios.get(
//         `${API}/api/admin/important-information`,
//         {
//           withCredentials: true,
//         }
//       );

//       if (response.data?.success) {
//         setInformation(response.data.data || []);
//       } else if (showErrorPopup) {
//         showAlert(
//           "error",
//           getApiResponseMessage(
//             response.data,
//             "Unable to load important information."
//           )
//         );
//       }
//     } catch (error: any) {
//       console.error(
//         "Failed to fetch important information:",
//         error
//       );

//       if (showErrorPopup) {
//         showApiError(
//           error,
//           "Failed to fetch important information."
//         );
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchInformation();
//   }, []);

//   /*
//   |--------------------------------------------------------------------------
//   | WARNING AUTO CLOSE
//   |--------------------------------------------------------------------------
//   */

//   useEffect(() => {
//     if (!alert) {
//       return;
//     }

//     /*
//      * Normal warning messages automatically disappear
//      * after 3 seconds.
//      *
//      * Confirmation dialogs have onConfirm and therefore
//      * must remain open.
//      */
//     if (
//       alert.type === "warning" &&
//       !alert.onConfirm
//     ) {
//       const timer = setTimeout(() => {
//         closeAlert();
//       }, 3000);

//       return () => clearTimeout(timer);
//     }
//   }, [alert]);

//   /*
//   |--------------------------------------------------------------------------
//   | ALERT KEYBOARD HANDLING
//   |--------------------------------------------------------------------------
//   */

//   useEffect(() => {
//     if (!alert) {
//       return;
//     }

//     const handleKeyDown = (
//       event: KeyboardEvent
//     ) => {
//       if (
//         event.key === "Enter" ||
//         event.key === "Escape"
//       ) {
//         event.preventDefault();

//         if (
//           event.key === "Enter" &&
//           alert.onConfirm
//         ) {
//           const confirmAction =
//             alert.onConfirm;

//           closeAlert();

//           setTimeout(() => {
//             confirmAction();
//           }, 100);
//         } else {
//           closeAlert();
//         }
//       }
//     };

//     window.addEventListener(
//       "keydown",
//       handleKeyDown
//     );

//     return () => {
//       window.removeEventListener(
//         "keydown",
//         handleKeyDown
//       );
//     };
//   }, [alert]);

//   /*
//   |--------------------------------------------------------------------------
//   | RESET FORM
//   |--------------------------------------------------------------------------
//   */

//   const resetForm = () => {
//     setTitle("");
//     setInformationType("emergency");
//     setContacts([]);

//     setTitleError("");
//     setTypeError("");
//     setContactsError("");
//     setContactErrors({});

//     setEditingId(null);
//   };

//   /*
//   |--------------------------------------------------------------------------
//   | OPEN CREATE
//   |--------------------------------------------------------------------------
//   */

//   const openCreate = () => {
//     const nextType =
//       getNextInformationType();

//     resetForm();

//     setInformationType(nextType);

//     setContacts([
//       createContact(),
//     ]);

//     setShowModal(true);
//   };

//   /*
//   |--------------------------------------------------------------------------
//   | OPEN EDIT
//   |--------------------------------------------------------------------------
//   */

//   const openEdit = (
//     item: Information
//   ) => {
//     const parsed =
//       parseDescription(
//         item.description
//       );

//     setEditingId(item.id);
//     setTitle(item.title);
//     setInformationType(
//       parsed.informationType
//     );

//     if (
//       parsed.contacts.length > 0
//     ) {
//       setContacts(
//         parsed.contacts.map(
//           (contact) => ({
//             ...contact,
//             isEditing: false,
//           })
//         )
//       );
//     } else {
//       setContacts([
//         createContact(),
//       ]);
//     }

//     setTitleError("");
//     setTypeError("");
//     setContactsError("");
//     setContactErrors({});

//     setShowModal(true);
//   };

//   /*
//   |--------------------------------------------------------------------------
//   | CLOSE MODAL
//   |--------------------------------------------------------------------------
//   */

//   const closeModal = () => {
//     if (saving) {
//       return;
//     }

//     setShowModal(false);
//     resetForm();
//   };

//   /*
//   |--------------------------------------------------------------------------
//   | UPDATE CONTACT
//   |--------------------------------------------------------------------------
//   */

//   const updateContact = (
//     id: string,
//     field: keyof Pick<
//       Contact,
//       | "designation"
//       | "name"
//       | "contactNo"
//     >,
//     value: string
//   ) => {
//     setContacts((prev) =>
//       prev.map((contact) =>
//         contact.id === id
//           ? {
//               ...contact,
//               [field]: value,
//             }
//           : contact
//       )
//     );

//     setContactErrors((prev) => {
//       const current =
//         prev[id];

//       if (!current) {
//         return prev;
//       }

//       const updated = {
//         ...current,
//         [field]: undefined,
//       };

//       const hasAnyError =
//         Object.values(
//           updated
//         ).some(Boolean);

//       if (!hasAnyError) {
//         const next = {
//           ...prev,
//         };

//         delete next[id];

//         return next;
//       }

//       return {
//         ...prev,
//         [id]: updated,
//       };
//     });

//     setContactsError("");
//   };

//   /*
//   |--------------------------------------------------------------------------
//   | EDIT CONTACT ROW
//   |--------------------------------------------------------------------------
//   */

//   const editContact = (
//     id: string
//   ) => {
//     setContacts((prev) =>
//       prev.map((contact) =>
//         contact.id === id
//           ? {
//               ...contact,
//               isEditing: true,
//             }
//           : contact
//       )
//     );
//   };

//   /*
//   |--------------------------------------------------------------------------
//   | VALIDATE SINGLE CONTACT
//   |--------------------------------------------------------------------------
//   */

//   const validateContact = (
//     contact: Contact
//   ) => {
//     const errors: {
//       designation?: string;
//       name?: string;
//       contactNo?: string;
//     } = {};

//     const designation =
//       contact.designation.trim();

//     const name =
//       contact.name.trim();

//     const contactNo =
//       contact.contactNo.trim();

//     if (!designation) {
//       errors.designation =
//         "Designation is required.";
//     } else if (
//       designation.length < 2
//     ) {
//       errors.designation =
//         "Designation must contain at least 2 characters.";
//     }

//     if (!name) {
//       errors.name =
//         "Name is required.";
//     } else if (
//       name.length < 2
//     ) {
//       errors.name =
//         "Name must contain at least 2 characters.";
//     }

//     if (!contactNo) {
//       errors.contactNo =
//         "Contact number is required.";
//     } else if (
//       !/^[6-9]\d{9}$/.test(
//         contactNo
//       )
//     ) {
//       errors.contactNo =
//         "Enter a valid 10-digit mobile number.";
//     }

//     return errors;
//   };

//   /*
//   |--------------------------------------------------------------------------
//   | VALIDATE ALL CONTACTS
//   |--------------------------------------------------------------------------
//   */

//   const validateContacts = () => {
//     if (
//       contacts.length === 0
//     ) {
//       setContactsError(
//         "At least one contact is required."
//       );

//       return false;
//     }

//     if (
//       contacts.length >
//       MAX_CONTACTS
//     ) {
//       setContactsError(
//         `A maximum of ${MAX_CONTACTS} contacts is allowed.`
//       );

//       return false;
//     }

//     let valid = true;

//     const errors: Record<
//       string,
//       {
//         designation?: string;
//         name?: string;
//         contactNo?: string;
//       }
//     > = {};

//     contacts.forEach(
//       (contact) => {
//         const contactError =
//           validateContact(
//             contact
//           );

//         if (
//           Object.keys(
//             contactError
//           ).length > 0
//         ) {
//           valid = false;

//           errors[
//             contact.id
//           ] = contactError;
//         }
//       }
//     );

//     setContactErrors(
//       errors
//     );

//     if (!valid) {
//       setContactsError(
//         "Please correct the contact details."
//       );
//     } else {
//       setContactsError("");
//     }

//     return valid;
//   };

//   /*
//   |--------------------------------------------------------------------------
//   | ADD CONTACT
//   |--------------------------------------------------------------------------
//   */

//   const addContact = () => {
//     if (saving) {
//       return;
//     }

//     if (
//       contacts.length >=
//       MAX_CONTACTS
//     ) {
//       showAlert(
//         "warning",
//         `You can add a maximum of ${MAX_CONTACTS} contacts.`
//       );

//       return;
//     }

//     const lastIndex =
//       contacts.length - 1;

//     if (lastIndex >= 0) {
//       const lastContact =
//         contacts[lastIndex];

//       const errors =
//         validateContact(
//           lastContact
//         );

//       if (
//         Object.keys(errors)
//           .length > 0
//       ) {
//         setContactErrors(
//           (prev) => ({
//             ...prev,
//             [lastContact.id]:
//               errors,
//           })
//         );

//         setContactsError(
//           `Please complete Contact ${
//             lastIndex + 1
//           } before adding another contact.`
//         );

//         showAlert(
//           "warning",
//           `Please complete Contact ${
//             lastIndex + 1
//           } before adding another contact.`
//         );

//         return;
//       }
//     }

//     /*
//      * Lock existing contacts and
//      * make the new row editable.
//      */
//     setContacts(
//       (prev) => [
//         ...prev.map(
//           (contact) => ({
//             ...contact,
//             isEditing: false,
//           })
//         ),
//         createContact(),
//       ]
//     );

//     setContactsError("");
//   };

//   /*
//   |--------------------------------------------------------------------------
//   | REMOVE CONTACT
//   |--------------------------------------------------------------------------
//   */

//   const removeContact = (
//     id: string
//   ) => {
//     if (saving) {
//       return;
//     }

//     if (
//       contacts.length === 1
//     ) {
//       showAlert(
//         "warning",
//         "At least one contact is required."
//       );

//       return;
//     }

//     setContacts(
//       (prev) =>
//         prev.filter(
//           (contact) =>
//             contact.id !== id
//         )
//     );

//     setContactErrors(
//       (prev) => {
//         const next = {
//           ...prev,
//         };

//         delete next[id];

//         return next;
//       }
//     );

//     setContactsError("");
//   };

//   /*
//   |--------------------------------------------------------------------------
//   | FORM VALIDATION
//   |--------------------------------------------------------------------------
//   */

//   const validateForm = () => {
//     let valid = true;

//     setTitleError("");
//     setTypeError("");
//     setContactsError("");

//     const trimmedTitle =
//       title.trim();

//     if (!trimmedTitle) {
//       setTitleError(
//         "Title is required."
//       );

//       valid = false;
//     } else if (
//       trimmedTitle.length < 3
//     ) {
//       setTitleError(
//         "Title must contain at least 3 characters."
//       );

//       valid = false;
//     }

//     if (
//       informationType !==
//         "emergency" &&
//       informationType !==
//         "community"
//     ) {
//       setTypeError(
//         "Please select an information type."
//       );

//       valid = false;
//     }

//     if (!editingId) {
//       if (
//         informationType ===
//           "emergency" &&
//         hasEmergencyInformation
//       ) {
//         setTypeError(
//           "Emergency contact information has already been added."
//         );

//         valid = false;
//       }

//       if (
//         informationType ===
//           "community" &&
//         hasCommunityInformation
//       ) {
//         setTypeError(
//           "Community contact information has already been added."
//         );

//         valid = false;
//       }
//     }

//     if (
//       !validateContacts()
//     ) {
//       valid = false;
//     }

//     return valid;
//   };

//   /*
//   |--------------------------------------------------------------------------
//   | SUBMIT
//   |--------------------------------------------------------------------------
//   */

//   const handleSubmit = async (
//     e: React.FormEvent
//   ) => {
//     e.preventDefault();

//     if (saving) {
//       return;
//     }

//     if (!validateForm()) {
//       showAlert(
//         "warning",
//         "Please fill in all required fields correctly."
//       );

//       return;
//     }

//     const finalDescription =
//       buildDescription(
//         informationType,
//         contacts
//       );

//     const wasEditing =
//       editingId !== null;

//     try {
//       setSaving(true);

//       let response;

//       if (
//         editingId !== null
//       ) {
//         response =
//           await axios.put(
//             `${API}/api/admin/important-information/${editingId}`,
//             {
//               title:
//                 title.trim(),
//               description:
//                 finalDescription,
//               priority:
//                 "Important",
//             },
//             {
//               withCredentials:
//                 true,
//             }
//           );
//       } else {
//         response =
//           await axios.post(
//             `${API}/api/admin/important-information`,
//             {
//               title:
//                 title.trim(),
//               description:
//                 finalDescription,
//               priority:
//                 "Important",
//             },
//             {
//               withCredentials:
//                 true,
//             }
//           );
//       }

//       setShowModal(false);
//       resetForm();

//       await fetchInformation(
//         false
//       );

//       showAlert(
//         "success",
//         getApiResponseMessage(
//           response.data,
//           wasEditing
//             ? "Important information updated successfully."
//             : "Important information added successfully."
//         )
//       );
//     } catch (error: any) {
//       console.error(
//         "Failed to save important information:",
//         error
//       );

//       showApiError(
//         error,
//         "Failed to save important information."
//       );
//     } finally {
//       setSaving(false);
//     }
//   };

//   /*
//   |--------------------------------------------------------------------------
//   | VIEW
//   |--------------------------------------------------------------------------
//   */

//   const openView = (
//     item: Information
//   ) => {
//     setSelectedInformation(
//       item
//     );

//     setShowViewModal(true);
//   };

//   const closeViewModal = () => {
//     setShowViewModal(false);
//     setSelectedInformation(
//       null
//     );
//   };

//   /*
//   |--------------------------------------------------------------------------
//   | DELETE
//   |--------------------------------------------------------------------------
//   */

//   const performDelete = async (
//     id: number
//   ) => {
//     try {
//       const response =
//         await axios.delete(
//           `${API}/api/admin/important-information/${id}`,
//           {
//             withCredentials:
//               true,
//           }
//         );

//       setInformation(
//         (prev) =>
//           prev.filter(
//             (item) =>
//               item.id !== id
//           )
//       );

//       showAlert(
//         "success",
//         getApiResponseMessage(
//           response.data,
//           "Important information deleted successfully."
//         )
//       );
//     } catch (error: any) {
//       console.error(
//         "Failed to delete information:",
//         error
//       );

//       showApiError(
//         error,
//         "Failed to delete important information."
//       );
//     }
//   };

//   const handleDelete = (
//     id: number
//   ) => {
//     showAlert(
//       "warning",
//       "Are you sure you want to delete this important information? This action cannot be undone.",
//       {
//         confirmText:
//           "Delete",
//         cancelText:
//           "Cancel",
//         onConfirm: () => {
//           closeAlert();

//           setTimeout(() => {
//             performDelete(id);
//           }, 100);
//         },
//       }
//     );
//   };

//   /*
//   |--------------------------------------------------------------------------
//   | DATE
//   |--------------------------------------------------------------------------
//   */

//   const formatDate = (
//     date: string
//   ) => {
//     if (!date) {
//       return "-";
//     }

//     return new Date(
//       date
//     ).toLocaleDateString(
//       "en-IN",
//       {
//         day: "2-digit",
//         month: "short",
//         year: "numeric",
//       }
//     );
//   };

//   /*
//   |--------------------------------------------------------------------------
//   | INFORMATION TYPE LABEL
//   |--------------------------------------------------------------------------
//   */

//   const getInformationTypeLabel = (
//     type: InformationType
//   ) => {
//     return type ===
//       "emergency"
//       ? "Emergency Contact Info"
//       : "Community Contact Info";
//   };

//   /*
//   |--------------------------------------------------------------------------
//   | VIEW CONTENT
//   |--------------------------------------------------------------------------
//   */

//   const renderViewContent = () => {
//     if (
//       !selectedInformation
//     ) {
//       return null;
//     }

//     const parsed =
//       parseDescription(
//         selectedInformation.description
//       );

//     if (parsed.isLegacy) {
//       return (
//         <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
//           <p className="whitespace-pre-wrap text-sm leading-6 text-slate-700">
//             {
//               selectedInformation.description
//             }
//           </p>
//         </div>
//       );
//     }

//     return (
//       <div className="space-y-5">
//         <div className="rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-3">
//           <p className="text-xs font-semibold uppercase tracking-wide text-indigo-500">
//             Information Type
//           </p>

//           <p className="mt-1 text-sm font-semibold text-indigo-800">
//             {getInformationTypeLabel(
//               parsed.informationType
//             )}
//           </p>
//         </div>

//         {parsed.contacts
//           .length === 0 ? (
//           <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center">
//             <p className="text-sm text-slate-500">
//               No contacts available.
//             </p>
//           </div>
//         ) : (
//           <div className="overflow-hidden rounded-xl border border-slate-200">
//             <div className="overflow-x-auto">
//               <table className="w-full min-w-[650px]">
//                 <thead className="bg-slate-50">
//                   <tr>
//                     <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
//                       #
//                     </th>

//                     <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
//                       Designation
//                     </th>

//                     <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
//                       Name
//                     </th>

//                     <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
//                       Contact No
//                     </th>
//                   </tr>
//                 </thead>

//                 <tbody className="divide-y divide-slate-100 bg-white">
//                   {parsed.contacts.map(
//                     (
//                       contact,
//                       index
//                     ) => (
//                       <tr
//                         key={
//                           contact.id
//                         }
//                       >
//                         <td className="px-4 py-3 text-sm text-slate-400">
//                           {index +
//                             1}
//                         </td>

//                         <td className="px-4 py-3 text-sm font-medium text-slate-700">
//                           {contact.designation ||
//                             "-"}
//                         </td>

//                         <td className="px-4 py-3 text-sm text-slate-700">
//                           {contact.name ||
//                             "-"}
//                         </td>

//                         <td className="px-4 py-3 text-sm font-medium text-slate-700">
//                           {contact.contactNo ||
//                             "-"}
//                         </td>
//                       </tr>
//                     )
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   };

//   /*
//   |--------------------------------------------------------------------------
//   | ANNOUNCEMENT-STYLE ALERT MODAL
//   |--------------------------------------------------------------------------
//   */

//   const AlertModal = ({
//     type,
//     message,
//     confirmText,
//     cancelText,
//     onConfirm,
//     onClose,
//   }: {
//     type: AlertType;
//     message: string;
//     confirmText?: string;
//     cancelText?: string;
//     onConfirm?: () => void;
//     onClose: () => void;
//   }) => {
//     const isConfirm =
//       Boolean(onConfirm);

//     const config =
//       type === "success"
//         ? {
//             borderColor:
//               "#10b981",
//             iconColor:
//               "#10b981",
//             buttonBg:
//               "#10b981",
//             title:
//               "Success",
//             Icon: CheckCircle2,
//           }
//         : type === "warning"
//         ? {
//             borderColor:
//               "#eab308",
//             iconColor:
//               "#eab308",
//             buttonBg:
//               "#eab308",
//             title:
//               isConfirm
//                 ? "Confirm Delete"
//                 : "Warning",
//             Icon: isConfirm
//               ? Trash2
//               : AlertTriangle,
//           }
//         : {
//             borderColor:
//               "#f43f5e",
//             iconColor:
//               "#f43f5e",
//             buttonBg:
//               "#f43f5e",
//             title:
//               "Error",
//             Icon: XCircle,
//           };

//     const Icon =
//       config.Icon;

//     return (
//       <div
//         className="fixed inset-0 z-[9999] flex items-center justify-center"
//         style={{
//           background:
//             "rgba(15, 23, 42, 0.45)",
//         }}
//       >
//         <div
//           className="w-[380px] max-w-[calc(100vw-32px)] overflow-hidden rounded-xl bg-white shadow-2xl"
//           style={{
//             borderLeft:
//               `4px solid ${config.borderColor}`,
//           }}
//           role={
//             isConfirm
//               ? "alertdialog"
//               : "dialog"
//           }
//           aria-modal="true"
//         >
//           {/* HEADER */}
//           <div
//             className="flex items-center justify-between px-5 py-3.5 text-white"
//             style={{
//               background:
//                 "#020b3d",
//             }}
//           >
//             <div className="flex items-center gap-3">
//               <Icon
//                 size={24}
//                 color={
//                   config.iconColor
//                 }
//               />

//               <h2 className="m-0 text-[17px] font-semibold">
//                 {config.title}
//               </h2>
//             </div>

//             <button
//               type="button"
//               onClick={onClose}
//               aria-label="Close"
//               className="flex cursor-pointer items-center rounded p-1 text-white transition hover:bg-white/10"
//             >
//               <X size={18} />
//             </button>
//           </div>

//           {/* MESSAGE */}
//           <div className="px-5 py-[22px]">
//             <p className="m-0 whitespace-pre-wrap text-sm leading-[1.6] text-slate-600">
//               {message}
//             </p>
//           </div>

//           {/* FOOTER */}
//           <div className="flex justify-end gap-2.5 border-t border-slate-200 bg-slate-50 px-5 py-3.5">
//             {isConfirm && (
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="rounded-lg border border-slate-200 bg-white px-5 py-2 text-[13px] font-medium text-slate-600 transition hover:bg-slate-100"
//               >
//                 {cancelText ||
//                   "Cancel"}
//               </button>
//             )}

//             <button
//               type="button"
//               onClick={() => {
//                 if (
//                   onConfirm
//                 ) {
//                   const confirmAction =
//                     onConfirm;

//                   onClose();

//                   setTimeout(
//                     () => {
//                       confirmAction();
//                     },
//                     100
//                   );
//                 } else {
//                   onClose();
//                 }
//               }}
//               className="rounded-lg border-none px-5 py-2 text-[13px] font-medium text-white transition"
//               style={{
//                 background:
//                   config.buttonBg,
//               }}
//             >
//               {isConfirm
//                 ? confirmText ||
//                   "Confirm"
//                 : "OK"}
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 sm:p-6">
//       <div className="mx-auto max-w-[1500px]">

//         {/* HEADER */}
//         <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//           <div>
//             <h1 className="text-2xl font-bold text-slate-800">
//               Important Information
//             </h1>

//             <p className="mt-1 text-sm text-slate-500">
//               Manage important contact information visible
//               to apartment members.
//             </p>
//           </div>

//           {canAddInformation && (
//             <button
//               type="button"
//               onClick={openCreate}
//               className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
//             >
//               <Plus size={18} />
//               Add Information
//             </button>
//           )}
//         </div>

//         {/* LIST */}
//         <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
//           {loading ? (
//             <div className="p-10 text-center text-slate-500">
//               Loading important information...
//             </div>
//           ) : information.length ===
//             0 ? (
//             <div className="flex flex-col items-center justify-center p-16 text-center">
//               <AlertCircle
//                 size={42}
//                 className="mb-4 text-slate-300"
//               />

//               <h3 className="text-lg font-semibold text-slate-700">
//                 No important information
//               </h3>

//               <p className="mt-1 text-sm text-slate-500">
//                 Add important emergency or community
//                 contact information.
//               </p>

//               {canAddInformation && (
//                 <button
//                   type="button"
//                   onClick={openCreate}
//                   className="mt-5 flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
//                 >
//                   <Plus size={16} />
//                   Add Information
//                 </button>
//               )}
//             </div>
//           ) : (
//             <div className="divide-y divide-slate-100">
//               {information.map(
//                 (item) => {
//                   const parsed =
//                     parseDescription(
//                       item.description
//                     );

//                   return (
//                     <div
//                       key={
//                         item.id
//                       }
//                       className="p-5 transition hover:bg-slate-50 sm:p-6"
//                     >
//                       <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
//                         <div className="min-w-0 flex-1">
//                           <div className="mb-3 flex flex-wrap items-center gap-2">
//                             <h2 className="text-lg font-semibold text-slate-800">
//                               {
//                                 item.title
//                               }
//                             </h2>

//                             {!parsed.isLegacy && (
//                               <span
//                                 className={`rounded-full px-3 py-1 text-xs font-semibold ${
//                                   parsed.informationType ===
//                                   "emergency"
//                                     ? "bg-red-100 text-red-700"
//                                     : "bg-blue-100 text-blue-700"
//                                 }`}
//                               >
//                                 {parsed.informationType ===
//                                 "emergency"
//                                   ? "Emergency"
//                                   : "Community"}
//                               </span>
//                             )}
//                           </div>

//                           {parsed.isLegacy ? (
//                             <p className="line-clamp-3 whitespace-pre-line text-sm leading-6 text-slate-600">
//                               {
//                                 item.description
//                               }
//                             </p>
//                           ) : (
//                             <>
//                               <p className="mb-3 text-sm text-slate-500">
//                                 {
//                                   parsed.contacts
//                                     .length
//                                 }{" "}
//                                 {parsed.contacts
//                                   .length ===
//                                 1
//                                   ? "contact"
//                                   : "contacts"}{" "}
//                                 added
//                               </p>

//                               <div className="flex flex-wrap gap-2">
//                                 {parsed.contacts
//                                   .slice(
//                                     0,
//                                     3
//                                   )
//                                   .map(
//                                     (
//                                       contact
//                                     ) => (
//                                       <span
//                                         key={
//                                           contact.id
//                                         }
//                                         className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-600"
//                                       >
//                                         <span className="font-semibold">
//                                           {
//                                             contact.name
//                                           }
//                                         </span>

//                                         {contact.designation
//                                           ? ` • ${contact.designation}`
//                                           : ""}
//                                       </span>
//                                     )
//                                   )}

//                                 {parsed.contacts
//                                   .length >
//                                   3 && (
//                                   <span className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-500">
//                                     +
//                                     {parsed.contacts
//                                       .length -
//                                       3}{" "}
//                                     more
//                                   </span>
//                                 )}
//                               </div>
//                             </>
//                           )}

//                           <p className="mt-4 text-xs text-slate-400">
//                             Created{" "}
//                             {formatDate(
//                               item.created_at
//                             )}
//                           </p>
//                         </div>

//                         {/* ACTIONS */}
//                         <div className="flex shrink-0 items-center gap-2">
//                           <button
//                             type="button"
//                             onClick={() =>
//                               openView(
//                                 item
//                               )
//                             }
//                             title="View"
//                             className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100"
//                           >
//                             <Eye
//                               size={17}
//                             />
//                           </button>

//                           <button
//                             type="button"
//                             onClick={() =>
//                               openEdit(
//                                 item
//                               )
//                             }
//                             title="Edit"
//                             className="rounded-lg border border-blue-200 p-2 text-blue-600 transition hover:bg-blue-50"
//                           >
//                             <Edit
//                               size={17}
//                             />
//                           </button>

//                           <button
//                             type="button"
//                             onClick={() =>
//                               handleDelete(
//                                 item.id
//                               )
//                             }
//                             title="Delete"
//                             className="rounded-lg border border-red-200 p-2 text-red-600 transition hover:bg-red-50"
//                           >
//                             <Trash2
//                               size={17}
//                             />
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 }
//               )}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* ================================================================= */}
//       {/* CREATE / EDIT MODAL */}
//       {/* ================================================================= */}

//       {showModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
//           <div className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

//             {/* HEADER */}
//             <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6 sm:py-5">
//               <div>
//                 <h2 className="text-xl font-bold text-slate-800">
//                   {editingId
//                     ? "Edit Important Information"
//                     : "Add Important Information"}
//                 </h2>

//                 <p className="mt-1 text-sm text-slate-500">
//                   {editingId
//                     ? "Update the contact information."
//                     : "Add important emergency or community contact information."}
//                 </p>
//               </div>

//               <button
//                 type="button"
//                 onClick={
//                   closeModal
//                 }
//                 disabled={saving}
//                 className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
//               >
//                 <X size={20} />
//               </button>
//             </div>

//             {/* FORM */}
//             <form
//               onSubmit={
//                 handleSubmit
//               }
//               className="flex min-h-0 flex-1 flex-col"
//             >
//               <div className="flex-1 space-y-6 overflow-y-auto p-5 sm:p-6">

//                 {/* TITLE */}
//                 <div>
//                   <label className="mb-2 block text-sm font-semibold text-slate-700">
//                     Title
//                     <span className="ml-1 text-red-500">
//                       *
//                     </span>
//                   </label>

//                   <input
//                     type="text"
//                     value={title}
//                     onChange={(
//                       e
//                     ) => {
//                       setTitle(
//                         e.target
//                           .value
//                       );

//                       if (
//                         titleError
//                       ) {
//                         setTitleError(
//                           ""
//                         );
//                       }
//                     }}
//                     placeholder="Enter information title"
//                     disabled={saving}
//                     className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${
//                       titleError
//                         ? "border-red-400 bg-red-50/30 focus:border-red-500 focus:ring-2 focus:ring-red-100"
//                         : "border-slate-200 bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
//                     }`}
//                   />

//                   {titleError && (
//                     <p className="mt-1.5 text-xs font-medium text-red-600">
//                       {
//                         titleError
//                       }
//                     </p>
//                   )}
//                 </div>

//                 {/* INFORMATION TYPE */}
//                 <div>
//                   <label className="mb-3 block text-sm font-semibold text-slate-700">
//                     Choose
//                     <span className="ml-1 text-red-500">
//                       *
//                     </span>
//                   </label>

//                   <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

//                     {/* EMERGENCY */}
//                     {(editingId ||
//                       canAddEmergency) &&
//                       (editingId
//                         ? informationType ===
//                             "emergency" ||
//                           !hasEmergencyInformation
//                         : canAddEmergency) && (
//                         <label
//                           className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
//                             informationType ===
//                             "emergency"
//                               ? "border-red-300 bg-red-50 ring-2 ring-red-100"
//                               : "border-slate-200 bg-white hover:bg-slate-50"
//                           }`}
//                         >
//                           <input
//                             type="radio"
//                             name="informationType"
//                             value="emergency"
//                             checked={
//                               informationType ===
//                               "emergency"
//                             }
//                             onChange={() => {
//                               setInformationType(
//                                 "emergency"
//                               );
//                               setTypeError(
//                                 ""
//                               );
//                             }}
//                             disabled={
//                               saving
//                             }
//                             className="h-4 w-4 accent-red-600"
//                           />

//                           <div>
//                             <p className="text-sm font-semibold text-slate-800">
//                               Emergency contact info
//                             </p>

//                             <p className="mt-0.5 text-xs text-slate-500">
//                               Security, police, ambulance,
//                               fire, etc.
//                             </p>
//                           </div>
//                         </label>
//                       )}

//                     {/* COMMUNITY */}
//                     {(editingId ||
//                       canAddCommunity) &&
//                       (editingId
//                         ? informationType ===
//                             "community" ||
//                           !hasCommunityInformation
//                         : canAddCommunity) && (
//                         <label
//                           className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
//                             informationType ===
//                             "community"
//                               ? "border-blue-300 bg-blue-50 ring-2 ring-blue-100"
//                               : "border-slate-200 bg-white hover:bg-slate-50"
//                           }`}
//                         >
//                           <input
//                             type="radio"
//                             name="informationType"
//                             value="community"
//                             checked={
//                               informationType ===
//                               "community"
//                             }
//                             onChange={() => {
//                               setInformationType(
//                                 "community"
//                               );
//                               setTypeError(
//                                 ""
//                               );
//                             }}
//                             disabled={
//                               saving
//                             }
//                             className="h-4 w-4 accent-blue-600"
//                           />

//                           <div>
//                             <p className="text-sm font-semibold text-slate-800">
//                               Others
//                             </p>

//                             <p className="mt-0.5 text-xs text-slate-500">
//                               Community contact information
//                             </p>
//                           </div>
//                         </label>
//                       )}
//                   </div>

//                   {typeError && (
//                     <p className="mt-1.5 text-xs font-medium text-red-600">
//                       {
//                         typeError
//                       }
//                     </p>
//                   )}
//                 </div>

//                 {/* CONTACTS */}
//                 <div>
//                   <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
//                     <div>
//                       <label className="block text-sm font-semibold text-slate-700">
//                         Contact Information
//                         <span className="ml-1 text-red-500">
//                           *
//                         </span>
//                       </label>

//                       <p className="mt-1 text-xs text-slate-500">
//                         Add up to{" "}
//                         {
//                           MAX_CONTACTS
//                         }{" "}
//                         contacts.
//                       </p>
//                     </div>

//                     <div
//                       className={`text-xs font-semibold ${
//                         contacts.length >=
//                         MAX_CONTACTS
//                           ? "text-red-600"
//                           : "text-slate-500"
//                       }`}
//                     >
//                       {
//                         contacts.length
//                       }{" "}
//                       /{" "}
//                       {
//                         MAX_CONTACTS
//                       }
//                     </div>
//                   </div>

//                   {contactsError && (
//                     <div className="mb-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2">
//                       <p className="text-xs font-medium text-red-600">
//                         {
//                           contactsError
//                         }
//                       </p>
//                     </div>
//                   )}

//                   <div className="space-y-3">
//                     {contacts.map(
//                       (
//                         contact,
//                         index
//                       ) => {
//                         const errors =
//                           contactErrors[
//                             contact
//                               .id
//                           ] ||
//                           {};

//                         return (
//                           <div
//                             key={
//                               contact.id
//                             }
//                             className="rounded-xl border border-slate-200 bg-slate-50 p-4"
//                           >
//                             {/* ROW HEADER */}
//                             <div className="mb-3 flex items-center justify-between">
//                               <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
//                                 Contact{" "}
//                                 {index +
//                                   1}
//                               </p>

//                               {contact.isEditing && (
//                                 <span className="rounded-full bg-blue-100 px-2.5 py-1 text-[11px] font-semibold text-blue-700">
//                                   Editing
//                                 </span>
//                               )}
//                             </div>

//                             <div className="grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto]">

//                               {/* DESIGNATION */}
//                               <div>
//                                 <label className="mb-1.5 block text-xs font-semibold text-slate-600">
//                                   Designation
//                                 </label>

//                                 <input
//                                   type="text"
//                                   value={
//                                     contact.designation
//                                   }
//                                   disabled={
//                                     !contact.isEditing ||
//                                     saving
//                                   }
//                                   onChange={(
//                                     e
//                                   ) =>
//                                     updateContact(
//                                       contact.id,
//                                       "designation",
//                                       e.target
//                                         .value
//                                     )
//                                   }
//                                   placeholder="e.g. Security"
//                                   className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition ${
//                                     errors.designation
//                                       ? "border-red-400 bg-red-50"
//                                       : contact.isEditing
//                                       ? "border-slate-300 bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
//                                       : "border-slate-200 bg-slate-100 text-slate-500"
//                                   }`}
//                                 />

//                                 {errors.designation && (
//                                   <p className="mt-1 text-[11px] font-medium text-red-600">
//                                     {
//                                       errors.designation
//                                     }
//                                   </p>
//                                 )}
//                               </div>

//                               {/* NAME */}
//                               <div>
//                                 <label className="mb-1.5 block text-xs font-semibold text-slate-600">
//                                   Name
//                                 </label>

//                                 <input
//                                   type="text"
//                                   value={
//                                     contact.name
//                                   }
//                                   disabled={
//                                     !contact.isEditing ||
//                                     saving
//                                   }
//                                   onChange={(
//                                     e
//                                   ) =>
//                                     updateContact(
//                                       contact.id,
//                                       "name",
//                                       e.target
//                                         .value
//                                     )
//                                   }
//                                   placeholder="Enter name"
//                                   className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition ${
//                                     errors.name
//                                       ? "border-red-400 bg-red-50"
//                                       : contact.isEditing
//                                       ? "border-slate-300 bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
//                                       : "border-slate-200 bg-slate-100 text-slate-500"
//                                   }`}
//                                 />

//                                 {errors.name && (
//                                   <p className="mt-1 text-[11px] font-medium text-red-600">
//                                     {
//                                       errors.name
//                                     }
//                                   </p>
//                                 )}
//                               </div>

//                               {/* CONTACT NUMBER */}
//                               <div>
//                                 <label className="mb-1.5 block text-xs font-semibold text-slate-600">
//                                   Contact No
//                                 </label>

//                                 <input
//                                   type="tel"
//                                   inputMode="numeric"
//                                   maxLength={
//                                     10
//                                   }
//                                   value={
//                                     contact.contactNo
//                                   }
//                                   disabled={
//                                     !contact.isEditing ||
//                                     saving
//                                   }
//                                   onChange={(
//                                     e
//                                   ) => {
//                                     const value =
//                                       e.target.value
//                                         .replace(
//                                           /\D/g,
//                                           ""
//                                         )
//                                         .slice(
//                                           0,
//                                           10
//                                         );

//                                     updateContact(
//                                       contact.id,
//                                       "contactNo",
//                                       value
//                                     );
//                                   }}
//                                   placeholder="10-digit number"
//                                   className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition ${
//                                     errors.contactNo
//                                       ? "border-red-400 bg-red-50"
//                                       : contact.isEditing
//                                       ? "border-slate-300 bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
//                                       : "border-slate-200 bg-slate-100 text-slate-500"
//                                   }`}
//                                 />

//                                 {errors.contactNo && (
//                                   <p className="mt-1 text-[11px] font-medium text-red-600">
//                                     {
//                                       errors.contactNo
//                                     }
//                                   </p>
//                                 )}
//                               </div>

//                               {/* ACTION BUTTONS */}
//                               <div className="flex items-end gap-2">

//                                 {/* EDIT */}
//                                 <button
//                                   type="button"
//                                   onClick={() =>
//                                     editContact(
//                                       contact.id
//                                     )
//                                   }
//                                   disabled={
//                                     saving ||
//                                     contact.isEditing
//                                   }
//                                   title={
//                                     contact.isEditing
//                                       ? "Currently editing"
//                                       : "Edit contact"
//                                   }
//                                   className={`flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-lg border transition ${
//                                     contact.isEditing
//                                       ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-300"
//                                       : "border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100"
//                                   }`}
//                                 >
//                                   <Pencil
//                                     size={
//                                       17
//                                     }
//                                   />
//                                 </button>

//                                 {/* ADD */}
//                                 <button
//                                   type="button"
//                                   onClick={
//                                     addContact
//                                   }
//                                   disabled={
//                                     saving ||
//                                     contacts.length >=
//                                       MAX_CONTACTS
//                                   }
//                                   title={
//                                     contacts.length >=
//                                     MAX_CONTACTS
//                                       ? "Maximum 10 contacts allowed"
//                                       : "Add contact"
//                                   }
//                                   className={`flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-lg border transition ${
//                                     contacts.length >=
//                                     MAX_CONTACTS
//                                       ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400"
//                                       : "border-emerald-200 bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
//                                   }`}
//                                 >
//                                   <Plus
//                                     size={
//                                       18
//                                     }
//                                   />
//                                 </button>

//                                 {/* REMOVE */}
//                                 <button
//                                   type="button"
//                                   onClick={() =>
//                                     removeContact(
//                                       contact.id
//                                     )
//                                   }
//                                   disabled={
//                                     saving ||
//                                     contacts.length ===
//                                       1
//                                   }
//                                   title={
//                                     contacts.length ===
//                                     1
//                                       ? "At least one contact is required"
//                                       : "Remove contact"
//                                   }
//                                   className={`flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-lg border transition ${
//                                     contacts.length ===
//                                     1
//                                       ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400"
//                                       : "border-red-200 bg-red-50 text-red-600 hover:bg-red-100"
//                                   }`}
//                                 >
//                                   <Minus
//                                     size={
//                                       18
//                                     }
//                                   />
//                                 </button>
//                               </div>
//                             </div>
//                           </div>
//                         );
//                       }
//                     )}
//                   </div>

//                   {contacts.length >=
//                     MAX_CONTACTS && (
//                     <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2">
//                       <p className="text-xs font-medium text-amber-700">
//                         Maximum of{" "}
//                         {
//                           MAX_CONTACTS
//                         }{" "}
//                         contacts reached.
//                         You cannot add
//                         another contact.
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* FORM BUTTONS */}
//               <div className="flex shrink-0 flex-col-reverse gap-3 border-t border-slate-200 bg-white px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
//                 <button
//                   type="button"
//                   onClick={
//                     closeModal
//                   }
//                   disabled={
//                     saving
//                   }
//                   className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   type="submit"
//                   disabled={
//                     saving
//                   }
//                   className="rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
//                 >
//                   {saving
//                     ? "Saving..."
//                     : editingId
//                     ? "Update Information"
//                     : "Add Information"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* ================================================================= */}
//       {/* VIEW MODAL */}
//       {/* ================================================================= */}

//       {showViewModal &&
//         selectedInformation && (
//           <div className="fixed inset-0 z-[55] flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
//             <div className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

//               <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6 sm:py-5">
//                 <div className="min-w-0">
//                   <h2 className="truncate text-xl font-bold text-slate-800">
//                     {
//                       selectedInformation.title
//                     }
//                   </h2>

//                   <p className="mt-1 text-sm text-slate-500">
//                     Important contact information
//                   </p>
//                 </div>

//                 <button
//                   type="button"
//                   onClick={
//                     closeViewModal
//                   }
//                   className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
//                 >
//                   <X size={20} />
//                 </button>
//               </div>

//               <div className="min-h-0 flex-1 overflow-y-auto p-5 sm:p-6">
//                 {renderViewContent()}
//               </div>

//               <div className="flex shrink-0 justify-end border-t border-slate-200 px-5 py-4 sm:px-6">
//                 <button
//                   type="button"
//                   onClick={
//                     closeViewModal
//                   }
//                   className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//       {/* ================================================================= */}
//       {/* ANNOUNCEMENT-STYLE ALERT */}
//       {/* ================================================================= */}

//       {alert && (
//         <AlertModal
//           type={alert.type}
//           message={
//             alert.message
//           }
//           confirmText={
//             alert.confirmText
//           }
//           cancelText={
//             alert.cancelText
//           }
//           onConfirm={
//             alert.onConfirm
//           }
//           onClose={
//             closeAlert
//           }
//         />
//       )}
//     </div>
//   );
// };

// export default ImportantInformation;
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Eye,
  Edit,
  Minus,
  Pencil,
  Plus,
  Trash2,
  X,
  XCircle,
  Phone,
  ShieldAlert,
  Users,
} from "lucide-react";

const API = import.meta.env.VITE_BACKEND_URL;

const MAX_CONTACTS = 10;

type InformationType = "emergency" | "community";

type Contact = {
  id: string;
  designation: string;
  name: string;
  contactNo: string;
  isEditing: boolean;
};

type InformationPayload = {
  informationType: InformationType;
  contacts: {
    designation: string;
    name: string;
    contactNo: string;
  }[];
};

type Information = {
  id: number;
  title: string;
  description: string;
  created_at: string;
  updated_at?: string;
  status?: "published" | "draft";
  priority?: string;
  expires_at?: string | null;
  is_active?: boolean;
};

/*
|--------------------------------------------------------------------------
| ALERT TYPES
|--------------------------------------------------------------------------
*/

type AlertType = "success" | "warning" | "error";

type AlertState = {
  type: AlertType;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
};

/*
|--------------------------------------------------------------------------
| CONTACT
|--------------------------------------------------------------------------
*/

const createContact = (): Contact => ({
  id: `${Date.now()}-${Math.random()}`,
  designation: "",
  name: "",
  contactNo: "",
  isEditing: true,
});

/*
|--------------------------------------------------------------------------
| API RESPONSE MESSAGE
|--------------------------------------------------------------------------
*/

const getApiResponseMessage = (
  data: any,
  fallback: string
): string => {
  if (!data) {
    return fallback;
  }

  if (typeof data === "string") {
    return data;
  }

  const directMessage =
    data.message ||
    data.msg ||
    data.error ||
    data.detail;

  if (typeof directMessage === "string") {
    return directMessage;
  }

  if (data.data) {
    const nestedMessage =
      data.data.message ||
      data.data.msg ||
      data.data.error ||
      data.data.detail;

    if (typeof nestedMessage === "string") {
      return nestedMessage;
    }
  }

  if (Array.isArray(data.errors)) {
    const messages = data.errors
      .map((item: any) => {
        if (typeof item === "string") {
          return item;
        }

        return (
          item?.message ||
          item?.msg ||
          item?.error ||
          item?.detail ||
          ""
        );
      })
      .filter(Boolean);

    if (messages.length > 0) {
      return messages.join("\n");
    }
  }

  return fallback;
};

/*
|--------------------------------------------------------------------------
| PARSE STORED DESCRIPTION
|--------------------------------------------------------------------------
*/

const parseDescription = (
  description: string
): {
  informationType: InformationType;
  contacts: Contact[];
  isLegacy: boolean;
} => {
  if (!description) {
    return {
      informationType: "community",
      contacts: [],
      isLegacy: false,
    };
  }

  try {
    const parsed = JSON.parse(description);

    if (
      parsed &&
      (parsed.informationType === "emergency" ||
        parsed.informationType === "community") &&
      Array.isArray(parsed.contacts)
    ) {
      return {
        informationType: parsed.informationType,
        contacts: parsed.contacts.map(
          (
            contact: {
              designation?: string;
              name?: string;
              contactNo?: string;
            },
            index: number
          ) => ({
            id: `existing-${index}-${Date.now()}-${Math.random()}`,
            designation: contact.designation || "",
            name: contact.name || "",
            contactNo: contact.contactNo || "",
            isEditing: false,
          })
        ),
        isLegacy: false,
      };
    }
  } catch {
    // Old records may contain plain text/html.
  }

  return {
    informationType: "community",
    contacts: [],
    isLegacy: true,
  };
};

/*
|--------------------------------------------------------------------------
| BUILD PAYLOAD
|--------------------------------------------------------------------------
*/

const buildDescription = (
  informationType: InformationType,
  contacts: Contact[]
) => {
  const payload: InformationPayload = {
    informationType,
    contacts: contacts.map((contact) => ({
      designation: contact.designation.trim(),
      name: contact.name.trim(),
      contactNo: contact.contactNo.trim(),
    })),
  };

  return JSON.stringify(payload);
};

const ImportantInformation = () => {
  const [information, setInformation] = useState<Information[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  const [editingId, setEditingId] = useState<number | null>(null);

  const [selectedInformation, setSelectedInformation] =
    useState<Information | null>(null);

  /*
  |--------------------------------------------------------------------------
  | FORM STATE
  |--------------------------------------------------------------------------
  */

  const [title, setTitle] = useState("");

  const [informationType, setInformationType] =
    useState<InformationType>("emergency");

  const [contacts, setContacts] = useState<Contact[]>([]);

  /*
  |--------------------------------------------------------------------------
  | ERRORS
  |--------------------------------------------------------------------------
  */

  const [titleError, setTitleError] = useState("");
  const [typeError, setTypeError] = useState("");
  const [contactsError, setContactsError] = useState("");

  const [contactErrors, setContactErrors] = useState<
    Record<
      string,
      {
        designation?: string;
        name?: string;
        contactNo?: string;
      }
    >
  >({});

  /*
  |--------------------------------------------------------------------------
  | ANNOUNCEMENT-STYLE ALERT
  |--------------------------------------------------------------------------
  */

  const [alert, setAlert] =
    useState<AlertState | null>(null);

  const showAlert = (
    type: AlertType,
    message: string,
    options?: {
      confirmText?: string;
      cancelText?: string;
      onConfirm?: () => void;
    }
  ) => {
    setAlert({
      type,
      message,
      ...options,
    });
  };

  const closeAlert = () => {
    setAlert(null);
  };

  /*
  |--------------------------------------------------------------------------
  | API ERROR POPUP
  |--------------------------------------------------------------------------
  */

  const showApiError = (
    error: any,
    fallback: string
  ) => {
    const message = getApiResponseMessage(
      error?.response?.data ?? error?.data,
      error?.message || fallback
    );

    showAlert("error", message);
  };

  /*
  |--------------------------------------------------------------------------
  | DETERMINE EXISTING INFORMATION TYPES
  |--------------------------------------------------------------------------
  */

  const existingInformationTypes = useMemo(() => {
    const types = new Set<InformationType>();

    information.forEach((item) => {
      const parsed = parseDescription(item.description);

      if (!parsed.isLegacy) {
        types.add(parsed.informationType);
      }
    });

    return types;
  }, [information]);

  const hasEmergencyInformation =
    existingInformationTypes.has("emergency");

  const hasCommunityInformation =
    existingInformationTypes.has("community");

  const canAddEmergency = !hasEmergencyInformation;
  const canAddCommunity = !hasCommunityInformation;

  const canAddInformation =
    canAddEmergency || canAddCommunity;

  /*
  |--------------------------------------------------------------------------
  | GET DEFAULT TYPE
  |--------------------------------------------------------------------------
  */

  const getNextInformationType = (): InformationType => {
    if (
      hasEmergencyInformation &&
      !hasCommunityInformation
    ) {
      return "community";
    }

    if (
      hasCommunityInformation &&
      !hasEmergencyInformation
    ) {
      return "emergency";
    }

    return "emergency";
  };

  /*
  |--------------------------------------------------------------------------
  | FETCH
  |--------------------------------------------------------------------------
  */

  const fetchInformation = async (
    showErrorPopup = true
  ) => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${API}/api/admin/important-information`,
        {
          withCredentials: true,
        }
      );

      if (response.data?.success) {
        setInformation(response.data.data || []);
      } else if (showErrorPopup) {
        showAlert(
          "error",
          getApiResponseMessage(
            response.data,
            "Unable to load important information."
          )
        );
      }
    } catch (error: any) {
      console.error(
        "Failed to fetch important information:",
        error
      );

      if (showErrorPopup) {
        showApiError(
          error,
          "Failed to fetch important information."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInformation();
  }, []);

  /*
  |--------------------------------------------------------------------------
  | WARNING AUTO CLOSE
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (!alert) {
      return;
    }

    if (
      alert.type === "warning" &&
      !alert.onConfirm
    ) {
      const timer = setTimeout(() => {
        closeAlert();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [alert]);

  /*
  |--------------------------------------------------------------------------
  | ALERT KEYBOARD HANDLING
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (!alert) {
      return;
    }

    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (
        event.key === "Enter" ||
        event.key === "Escape"
      ) {
        event.preventDefault();

        if (
          event.key === "Enter" &&
          alert.onConfirm
        ) {
          const confirmAction =
            alert.onConfirm;

          closeAlert();

          setTimeout(() => {
            confirmAction();
          }, 100);
        } else {
          closeAlert();
        }
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [alert]);

  /*
  |--------------------------------------------------------------------------
  | RESET FORM
  |--------------------------------------------------------------------------
  */

  const resetForm = () => {
    setTitle("");
    setInformationType("emergency");
    setContacts([]);

    setTitleError("");
    setTypeError("");
    setContactsError("");
    setContactErrors({});

    setEditingId(null);
  };

  /*
  |--------------------------------------------------------------------------
  | OPEN CREATE
  |--------------------------------------------------------------------------
  */

  const openCreate = () => {
    const nextType =
      getNextInformationType();

    resetForm();

    setInformationType(nextType);

    setContacts([
      createContact(),
    ]);

    setShowModal(true);
  };

  /*
  |--------------------------------------------------------------------------
  | OPEN EDIT
  |--------------------------------------------------------------------------
  */

  const openEdit = (
    item: Information
  ) => {
    const parsed =
      parseDescription(
        item.description
      );

    setEditingId(item.id);
    setTitle(item.title);
    setInformationType(
      parsed.informationType
    );

    if (
      parsed.contacts.length > 0
    ) {
      setContacts(
        parsed.contacts.map(
          (contact) => ({
            ...contact,
            isEditing: false,
          })
        )
      );
    } else {
      setContacts([
        createContact(),
      ]);
    }

    setTitleError("");
    setTypeError("");
    setContactsError("");
    setContactErrors({});

    setShowModal(true);
  };

  /*
  |--------------------------------------------------------------------------
  | CLOSE MODAL
  |--------------------------------------------------------------------------
  */

  const closeModal = () => {
    if (saving) {
      return;
    }

    setShowModal(false);
    resetForm();
  };

  /*
  |--------------------------------------------------------------------------
  | UPDATE CONTACT
  |--------------------------------------------------------------------------
  */

  const updateContact = (
    id: string,
    field: keyof Pick<
      Contact,
      | "designation"
      | "name"
      | "contactNo"
    >,
    value: string
  ) => {
    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === id
          ? {
              ...contact,
              [field]: value,
            }
          : contact
      )
    );

    setContactErrors((prev) => {
      const current =
        prev[id];

      if (!current) {
        return prev;
      }

      const updated = {
        ...current,
        [field]: undefined,
      };

      const hasAnyError =
        Object.values(
          updated
        ).some(Boolean);

      if (!hasAnyError) {
        const next = {
          ...prev,
        };

        delete next[id];

        return next;
      }

      return {
        ...prev,
        [id]: updated,
      };
    });

    setContactsError("");
  };

  /*
  |--------------------------------------------------------------------------
  | EDIT CONTACT ROW
  |--------------------------------------------------------------------------
  */

  const editContact = (
    id: string
  ) => {
    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === id
          ? {
              ...contact,
              isEditing: true,
            }
          : contact
      )
    );
  };

  /*
  |--------------------------------------------------------------------------
  | VALIDATE SINGLE CONTACT
  |--------------------------------------------------------------------------
  */

  const validateContact = (
    contact: Contact
  ) => {
    const errors: {
      designation?: string;
      name?: string;
      contactNo?: string;
    } = {};

    const designation =
      contact.designation.trim();

    const name =
      contact.name.trim();

    const contactNo =
      contact.contactNo.trim();

    if (!designation) {
      errors.designation =
        "Designation is required.";
    } else if (
      designation.length < 2
    ) {
      errors.designation =
        "Designation must contain at least 2 characters.";
    }

    if (!name) {
      errors.name =
        "Name is required.";
    } else if (
      name.length < 2
    ) {
      errors.name =
        "Name must contain at least 2 characters.";
    }

    if (!contactNo) {
      errors.contactNo =
        "Contact number is required.";
    } else if (
      !/^[6-9]\d{9}$/.test(
        contactNo
      )
    ) {
      errors.contactNo =
        "Enter a valid 10-digit mobile number.";
    }

    return errors;
  };

  /*
  |--------------------------------------------------------------------------
  | VALIDATE ALL CONTACTS
  |--------------------------------------------------------------------------
  */

  const validateContacts = () => {
    if (
      contacts.length === 0
    ) {
      setContactsError(
        "At least one contact is required."
      );

      return false;
    }

    if (
      contacts.length >
      MAX_CONTACTS
    ) {
      setContactsError(
        `A maximum of ${MAX_CONTACTS} contacts is allowed.`
      );

      return false;
    }

    let valid = true;

    const errors: Record<
      string,
      {
        designation?: string;
        name?: string;
        contactNo?: string;
      }
    > = {};

    contacts.forEach(
      (contact) => {
        const contactError =
          validateContact(
            contact
          );

        if (
          Object.keys(
            contactError
          ).length > 0
        ) {
          valid = false;

          errors[
            contact.id
          ] = contactError;
        }
      }
    );

    setContactErrors(
      errors
    );

    if (!valid) {
      setContactsError(
        "Please correct the contact details."
      );
    } else {
      setContactsError("");
    }

    return valid;
  };

  /*
  |--------------------------------------------------------------------------
  | ADD CONTACT
  |--------------------------------------------------------------------------
  */

  const addContact = () => {
    if (saving) {
      return;
    }

    if (
      contacts.length >=
      MAX_CONTACTS
    ) {
      showAlert(
        "warning",
        `You can add a maximum of ${MAX_CONTACTS} contacts.`
      );

      return;
    }

    const lastIndex =
      contacts.length - 1;

    if (lastIndex >= 0) {
      const lastContact =
        contacts[lastIndex];

      const errors =
        validateContact(
          lastContact
        );

      if (
        Object.keys(errors)
          .length > 0
      ) {
        setContactErrors(
          (prev) => ({
            ...prev,
            [lastContact.id]:
              errors,
          })
        );

        setContactsError(
          `Please complete Contact ${
            lastIndex + 1
          } before adding another contact.`
        );

        showAlert(
          "warning",
          `Please complete Contact ${
            lastIndex + 1
          } before adding another contact.`
        );

        return;
      }
    }

    setContacts(
      (prev) => [
        ...prev.map(
          (contact) => ({
            ...contact,
            isEditing: false,
          })
        ),
        createContact(),
      ]
    );

    setContactsError("");
  };

  /*
  |--------------------------------------------------------------------------
  | REMOVE CONTACT
  |--------------------------------------------------------------------------
  */

  const removeContact = (
    id: string
  ) => {
    if (saving) {
      return;
    }

    if (
      contacts.length === 1
    ) {
      showAlert(
        "warning",
        "At least one contact is required."
      );

      return;
    }

    setContacts(
      (prev) =>
        prev.filter(
          (contact) =>
            contact.id !== id
        )
    );

    setContactErrors(
      (prev) => {
        const next = {
          ...prev,
        };

        delete next[id];

        return next;
      }
    );

    setContactsError("");
  };

  /*
  |--------------------------------------------------------------------------
  | FORM VALIDATION
  |--------------------------------------------------------------------------
  */

  const validateForm = () => {
    let valid = true;

    setTitleError("");
    setTypeError("");
    setContactsError("");

    const trimmedTitle =
      title.trim();

    if (!trimmedTitle) {
      setTitleError(
        "Title is required."
      );

      valid = false;
    } else if (
      trimmedTitle.length < 3
    ) {
      setTitleError(
        "Title must contain at least 3 characters."
      );

      valid = false;
    }

    if (
      informationType !==
        "emergency" &&
      informationType !==
        "community"
    ) {
      setTypeError(
        "Please select an information type."
      );

      valid = false;
    }

    if (!editingId) {
      if (
        informationType ===
          "emergency" &&
        hasEmergencyInformation
      ) {
        setTypeError(
          "Emergency contact information has already been added."
        );

        valid = false;
      }

      if (
        informationType ===
          "community" &&
        hasCommunityInformation
      ) {
        setTypeError(
          "Community contact information has already been added."
        );

        valid = false;
      }
    }

    if (
      !validateContacts()
    ) {
      valid = false;
    }

    return valid;
  };

  /*
  |--------------------------------------------------------------------------
  | SUBMIT
  |--------------------------------------------------------------------------
  */

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (saving) {
      return;
    }

    if (!validateForm()) {
      showAlert(
        "warning",
        "Please fill in all required fields correctly."
      );

      return;
    }

    const finalDescription =
      buildDescription(
        informationType,
        contacts
      );

    const wasEditing =
      editingId !== null;

    try {
      setSaving(true);

      let response;

      if (
        editingId !== null
      ) {
        response =
          await axios.put(
            `${API}/api/admin/important-information/${editingId}`,
            {
              title:
                title.trim(),
              description:
                finalDescription,
              priority:
                "Important",
            },
            {
              withCredentials:
                true,
            }
          );
      } else {
        response =
          await axios.post(
            `${API}/api/admin/important-information`,
            {
              title:
                title.trim(),
              description:
                finalDescription,
              priority:
                "Important",
            },
            {
              withCredentials:
                true,
            }
          );
      }

      setShowModal(false);
      resetForm();

      await fetchInformation(
        false
      );

      showAlert(
        "success",
        getApiResponseMessage(
          response.data,
          wasEditing
            ? "Important information updated successfully."
            : "Important information added successfully."
        )
      );
    } catch (error: any) {
      console.error(
        "Failed to save important information:",
        error
      );

      showApiError(
        error,
        "Failed to save important information."
      );
    } finally {
      setSaving(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | VIEW
  |--------------------------------------------------------------------------
  */

  const openView = (
    item: Information
  ) => {
    setSelectedInformation(
      item
    );

    setShowViewModal(true);
  };

  const closeViewModal = () => {
    setShowViewModal(false);
    setSelectedInformation(
      null
    );
  };

  /*
  |--------------------------------------------------------------------------
  | DELETE
  |--------------------------------------------------------------------------
  */

  const performDelete = async (
    id: number
  ) => {
    try {
      const response =
        await axios.delete(
          `${API}/api/admin/important-information/${id}`,
          {
            withCredentials:
              true,
          }
        );

      setInformation(
        (prev) =>
          prev.filter(
            (item) =>
              item.id !== id
          )
      );

      showAlert(
        "success",
        getApiResponseMessage(
          response.data,
          "Important information deleted successfully."
        )
      );
    } catch (error: any) {
      console.error(
        "Failed to delete information:",
        error
      );

      showApiError(
        error,
        "Failed to delete important information."
      );
    }
  };

  const handleDelete = (
    id: number
  ) => {
    showAlert(
      "warning",
      "Are you sure you want to delete this important information? This action cannot be undone.",
      {
        confirmText:
          "Delete",
        cancelText:
          "Cancel",
        onConfirm: () => {
          performDelete(id);
        },
      }
    );
  };

  /*
  |--------------------------------------------------------------------------
  | DATE
  |--------------------------------------------------------------------------
  */

  const formatDate = (
    date: string
  ) => {
    if (!date) {
      return "-";
    }

    return new Date(
      date
    ).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  /*
  |--------------------------------------------------------------------------
  | INFORMATION TYPE LABEL
  |--------------------------------------------------------------------------
  */

  const getInformationTypeLabel = (
    type: InformationType
  ) => {
    return type ===
      "emergency"
      ? "Emergency Contact Info"
      : "Community Contact Info";
  };

  /*
  |--------------------------------------------------------------------------
  | VIEW CONTENT
  |--------------------------------------------------------------------------
  */

  const renderViewContent = () => {
    if (
      !selectedInformation
    ) {
      return null;
    }

    const parsed =
      parseDescription(
        selectedInformation.description
      );

    if (parsed.isLegacy) {
      return (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="whitespace-pre-wrap text-sm leading-6 text-slate-700">
            {
              selectedInformation.description
            }
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-5">
        <div
          className={`rounded-xl border px-4 py-3 ${
            parsed.informationType ===
            "emergency"
              ? "border-red-100 bg-red-50"
              : "border-blue-100 bg-blue-50"
          }`}
        >
          <p
            className={`text-xs font-semibold uppercase tracking-wide ${
              parsed.informationType ===
              "emergency"
                ? "text-red-500"
                : "text-blue-500"
            }`}
          >
            Information Type
          </p>

          <p
            className={`mt-1 text-sm font-semibold ${
              parsed.informationType ===
              "emergency"
                ? "text-red-800"
                : "text-blue-800"
            }`}
          >
            {getInformationTypeLabel(
              parsed.informationType
            )}
          </p>
        </div>

        {parsed.contacts
          .length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center">
            <p className="text-sm text-slate-500">
              No contacts available.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-slate-200">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[650px]">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      #
                    </th>

                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Designation
                    </th>

                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Name
                    </th>

                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Contact No
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 bg-white">
                  {parsed.contacts.map(
                    (
                      contact,
                      index
                    ) => (
                      <tr
                        key={
                          contact.id
                        }
                      >
                        <td className="px-4 py-3 text-sm text-slate-400">
                          {index +
                            1}
                        </td>

                        <td className="px-4 py-3 text-sm font-medium text-slate-700">
                          {contact.designation ||
                            "-"}
                        </td>

                        <td className="px-4 py-3 text-sm text-slate-700">
                          {contact.name ||
                            "-"}
                        </td>

                        <td className="px-4 py-3 text-sm font-medium text-slate-700">
                          {contact.contactNo ||
                            "-"}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  };

  /*
  |--------------------------------------------------------------------------
  | ANNOUNCEMENT-STYLE ALERT MODAL
  |--------------------------------------------------------------------------
  */

  const AlertModal = ({
    type,
    message,
    confirmText,
    cancelText,
    onConfirm,
    onClose,
  }: {
    type: AlertType;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
    onClose: () => void;
  }) => {
    const isConfirm =
      Boolean(onConfirm);

    const config =
      type === "success"
        ? {
            borderColor:
              "#10b981",
            iconColor:
              "#10b981",
            buttonBg:
              "#10b981",
            title:
              "Success",
            Icon: CheckCircle2,
          }
        : type === "warning"
        ? {
            borderColor:
              "#eab308",
            iconColor:
              "#eab308",
            buttonBg:
              "#eab308",
            title:
              isConfirm
                ? "Confirm Delete"
                : "Warning",
            Icon: isConfirm
              ? Trash2
              : AlertTriangle,
          }
        : {
            borderColor:
              "#f43f5e",
            iconColor:
              "#f43f5e",
            buttonBg:
              "#f43f5e",
            title:
              "Error",
            Icon: XCircle,
          };

    const Icon =
      config.Icon;

    return (
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center"
        style={{
          background:
            "rgba(15, 23, 42, 0.45)",
        }}
      >
        <div
          className="w-[380px] max-w-[calc(100vw-32px)] overflow-hidden rounded-xl bg-white shadow-2xl"
          style={{
            borderLeft:
              `4px solid ${config.borderColor}`,
          }}
          role={
            isConfirm
              ? "alertdialog"
              : "dialog"
          }
          aria-modal="true"
        >
          <div
            className="flex items-center justify-between px-5 py-3.5 text-white"
            style={{
              background:
                "#020b3d",
            }}
          >
            <div className="flex items-center gap-3">
              <Icon
                size={24}
                color={
                  config.iconColor
                }
              />

              <h2 className="m-0 text-[17px] font-semibold">
                {config.title}
              </h2>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="flex cursor-pointer items-center rounded p-1 text-white transition hover:bg-white/10"
            >
              <X size={18} />
            </button>
          </div>

          <div className="px-5 py-[22px]">
            <p className="m-0 whitespace-pre-wrap text-sm leading-[1.6] text-slate-600">
              {message}
            </p>
          </div>

          <div className="flex justify-end gap-2.5 border-t border-slate-200 bg-slate-50 px-5 py-3.5">
            {isConfirm && (
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-slate-200 bg-white px-5 py-2 text-[13px] font-medium text-slate-600 transition hover:bg-slate-100"
              >
                {cancelText ||
                  "Cancel"}
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                if (
                  onConfirm
                ) {
                  const confirmAction =
                    onConfirm;

                  onClose();

                  setTimeout(
                    () => {
                      confirmAction();
                    },
                    100
                  );
                } else {
                  onClose();
                }
              }}
              className="rounded-lg border-none px-5 py-2 text-[13px] font-medium text-white transition"
              style={{
                background:
                  config.buttonBg,
              }}
            >
              {isConfirm
                ? confirmText ||
                  "Confirm"
                : "OK"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  /*
  |--------------------------------------------------------------------------
  | INFORMATION CARD
  |--------------------------------------------------------------------------
  */

  const renderInformationCard = (
    item: Information
  ) => {
    const parsed =
      parseDescription(
        item.description
      );

    if (parsed.isLegacy) {
      return (
        <div
          key={item.id}
          className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
        >
          <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white px-5 py-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                  <Users size={21} />
                </div>

                <div className="min-w-0">
                  <h2 className="truncate text-lg font-bold text-slate-800">
                    {item.title}
                  </h2>

                  <p className="mt-0.5 text-xs text-slate-500">
                    Important Information
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-1.5">
                <button
                  type="button"
                  onClick={() =>
                    openView(item)
                  }
                  title="View"
                  className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100"
                >
                  <Eye size={16} />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    openEdit(item)
                  }
                  title="Edit"
                  className="rounded-lg border border-blue-200 p-2 text-blue-600 transition hover:bg-blue-50"
                >
                  <Edit size={16} />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleDelete(item.id)
                  }
                  title="Delete"
                  className="rounded-lg border border-red-200 p-2 text-red-600 transition hover:bg-red-50"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="p-5">
            <p className="line-clamp-4 whitespace-pre-line text-sm leading-6 text-slate-600">
              {item.description}
            </p>

            <p className="mt-5 border-t border-slate-100 pt-4 text-xs text-slate-400">
              Created {formatDate(item.created_at)}
            </p>
          </div>
        </div>
      );
    }

    const isEmergency =
      parsed.informationType ===
      "emergency";

    return (
      <div
        key={item.id}
        className={`group overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${
          isEmergency
            ? "border-grey-10"
            : "border-grey-10"
        }`}
      >
        {/* CARD HEADER */}
        <div
          className={`border-b px-5 py-4 ${
            isEmergency
              ? "border-grey-10 bg-gradient-to-r from-grey-10 via-white to-white"
              : "border-blue-10 bg-gradient-to-r from-blue-10 via-white to-white"
          }`}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3">
              {/* <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                  isEmergency
                    ? "bg-red-100 text-red-600"
                    : "bg-blue-100 text-blue-600"
                }`}
              >
                {isEmergency ? (
                  <ShieldAlert size={23} />
                ) : (
                  <Users size={23} />
                )}
              </div> */}

              <div className="min-w-0">
                <h2 className="truncate text-lg font-bold text-slate-800">
                  {item.title}
                </h2>

                <div className="mt-1 flex items-center gap-2">
                  <span
                    className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
                      isEmergency
                        ? "bg-grey-10 text-grey-100"
                        : "bg-grey-10 text-grey-100"
                    }`}
                  >
                    {isEmergency
                      ? "Emergency"
                      : "Community"}
                  </span>

                  <span className="text-xs text-slate-400">
                    {parsed.contacts.length}{" "}
                    {parsed.contacts.length ===
                    1
                      ? "contact"
                      : "contacts"}
                  </span>
                </div>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex shrink-0 items-center gap-1.5">
              <button
                type="button"
                onClick={() =>
                  openView(item)
                }
                title="View"
                className="rounded-lg border border-slate-200 bg-white p-2 text-slate-600 transition hover:bg-slate-100"
              >
                <Eye size={16} />
              </button>

              <button
                type="button"
                onClick={() =>
                  openEdit(item)
                }
                title="Edit"
                className="rounded-lg border border-blue-200 bg-white p-2 text-blue-600 transition hover:bg-blue-50"
              >
                <Edit size={16} />
              </button>

              <button
                type="button"
                onClick={() =>
                  handleDelete(item.id)
                }
                title="Delete"
                className="rounded-lg border border-red-200 bg-white p-2 text-red-600 transition hover:bg-red-50"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* CONTACTS */}
        <div className="p-5">
          {parsed.contacts.length ===
          0 ? (
            <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-center">
              <p className="text-sm text-slate-500">
                No contacts available.
              </p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {parsed.contacts
                .slice(0, 4)
                .map((contact, index) => (
                  <div
                    key={contact.id}
                    className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/80 px-3.5 py-3 transition hover:bg-slate-100"
                  >
                    {/* NUMBER */}
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                        isEmergency
                          ? "bg-grey-100 text-grey-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {index + 1}
                    </div>

                    {/* DETAILS */}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-slate-700">
                        {contact.name ||
                          "-"}
                      </p>

                      <p className="truncate text-xs text-slate-500">
                        {contact.designation ||
                          "Contact"}
                      </p>
                    </div>

                    {/* PHONE */}
                    <div className="flex shrink-0 items-center gap-1.5 text-xs font-semibold text-slate-600">
                      <Phone
                        size={14}
                        className={
                          isEmergency
                            ? "text-blue-500"
                            : "text-blue-500"
                        }
                      />

                      <span className="hidden sm:inline">
                        {contact.contactNo ||
                          "-"}
                      </span>
                    </div>
                  </div>
                ))}

              {parsed.contacts.length >
                4 && (
                <button
                  type="button"
                  onClick={() =>
                    openView(item)
                  }
                  className="w-full rounded-xl border border-dashed border-slate-200 px-3 py-2.5 text-xs font-semibold text-slate-500 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700"
                >
                  View{" "}
                  {parsed.contacts.length -
                    4}{" "}
                  more contacts
                </button>
              )}
            </div>
          )}

          {/* FOOTER */}
          {/* <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
            <p className="text-xs text-slate-400">
              Created{" "}
              {formatDate(
                item.created_at
              )}
            </p>

            <button
              type="button"
              onClick={() =>
                openView(item)
              }
              className={`text-xs font-semibold transition ${
                isEmergency
                  ? "text-red-600 hover:text-red-700"
                  : "text-blue-600 hover:text-blue-700"
              }`}
            >
              View details →
            </button>
          </div> */}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 sm:p-6">
      <div className="mx-auto max-w-[1500px]">

        {/* HEADER */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Important Information
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage important contact information visible
              to apartment members.
            </p>
          </div>

          {/* ADD INFORMATION */}
          {canAddInformation && (
            <button
              type="button"
              onClick={openCreate}
              className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
            >
              <Plus size={18} />
              Add Information
            </button>
          )}
        </div>

        {/* =============================================================== */}
        {/* INFORMATION CARDS */}
        {/* =============================================================== */}

        {loading ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-indigo-600" />

            <p className="text-sm text-slate-500">
              Loading important information...
            </p>
          </div>
        ) : information.length ===
          0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col items-center justify-center p-16 text-center">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-500">
                <AlertCircle size={34} />
              </div>

              <h3 className="text-lg font-semibold text-slate-700">
                No important information
              </h3>

              <p className="mt-1 max-w-md text-sm leading-6 text-slate-500">
                Add important emergency or community
                contact information to make it visible
                to apartment members.
              </p>

              {canAddInformation && (
                <button
                  type="button"
                  onClick={openCreate}
                  className="mt-5 flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
                >
                  <Plus size={16} />
                  Add Information
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {information.map(
              (item) =>
                renderInformationCard(
                  item
                )
            )}
          </div>
        )}
      </div>

      {/* ================================================================= */}
      {/* CREATE / EDIT MODAL */}
      {/* ================================================================= */}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
          <div className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

            {/* HEADER */}
            <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6 sm:py-5">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  {editingId
                    ? "Edit Important Information"
                    : "Add Important Information"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {editingId
                    ? "Update the contact information."
                    : "Add important emergency or community contact information."}
                </p>
              </div>

              <button
                type="button"
                onClick={
                  closeModal
                }
                disabled={saving}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <X size={20} />
              </button>
            </div>

            {/* FORM */}
            <form
              onSubmit={
                handleSubmit
              }
              className="flex min-h-0 flex-1 flex-col"
            >
              <div className="flex-1 space-y-6 overflow-y-auto p-5 sm:p-6">

                {/* TITLE */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Title
                    <span className="ml-1 text-red-500">
                      *
                    </span>
                  </label>

                  <input
                    type="text"
                    value={title}
                    onChange={(
                      e
                    ) => {
                      setTitle(
                        e.target.value
                      );

                      if (
                        titleError
                      ) {
                        setTitleError(
                          ""
                        );
                      }
                    }}
                    placeholder="Enter information title"
                    disabled={saving}
                    className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${
                      titleError
                        ? "border-red-400 bg-red-50/30 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                        : "border-slate-200 bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    }`}
                  />

                  {titleError && (
                    <p className="mt-1.5 text-xs font-medium text-red-600">
                      {
                        titleError
                      }
                    </p>
                  )}
                </div>

                {/* INFORMATION TYPE */}
                <div>
                  <label className="mb-3 block text-sm font-semibold text-slate-700">
                    Choose
                    <span className="ml-1 text-red-500">
                      *
                    </span>
                  </label>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                    {/* EMERGENCY */}
                    {(editingId ||
                      canAddEmergency) &&
                      (editingId
                        ? informationType ===
                            "emergency" ||
                          !hasEmergencyInformation
                        : canAddEmergency) && (
                        <label
                          className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
                            informationType ===
                            "emergency"
                              ? "border-red-300 bg-red-50 ring-2 ring-red-100"
                              : "border-slate-200 bg-white hover:bg-slate-50"
                          }`}
                        >
                          <input
                            type="radio"
                            name="informationType"
                            value="emergency"
                            checked={
                              informationType ===
                              "emergency"
                            }
                            onChange={() => {
                              setInformationType(
                                "emergency"
                              );
                              setTypeError(
                                ""
                              );
                            }}
                            disabled={
                              saving
                            }
                            className="h-4 w-4 accent-red-600"
                          />

                          <div>
                            <p className="text-sm font-semibold text-slate-800">
                              Emergency contact info
                            </p>

                            <p className="mt-0.5 text-xs text-slate-500">
                              Security, police, ambulance,
                              fire, etc.
                            </p>
                          </div>
                        </label>
                      )}

                    {/* COMMUNITY */}
                    {(editingId ||
                      canAddCommunity) &&
                      (editingId
                        ? informationType ===
                            "community" ||
                          !hasCommunityInformation
                        : canAddCommunity) && (
                        <label
                          className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
                            informationType ===
                            "community"
                              ? "border-blue-300 bg-blue-50 ring-2 ring-blue-100"
                              : "border-slate-200 bg-white hover:bg-slate-50"
                          }`}
                        >
                          <input
                            type="radio"
                            name="informationType"
                            value="community"
                            checked={
                              informationType ===
                              "community"
                            }
                            onChange={() => {
                              setInformationType(
                                "community"
                              );
                              setTypeError(
                                ""
                              );
                            }}
                            disabled={
                              saving
                            }
                            className="h-4 w-4 accent-blue-600"
                          />

                          <div>
                            <p className="text-sm font-semibold text-slate-800">
                              Others
                            </p>

                            <p className="mt-0.5 text-xs text-slate-500">
                              Community contact information
                            </p>
                          </div>
                        </label>
                      )}
                  </div>

                  {typeError && (
                    <p className="mt-1.5 text-xs font-medium text-red-600">
                      {
                        typeError
                      }
                    </p>
                  )}
                </div>

                {/* CONTACTS */}
                <div>
                  <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700">
                        Contact Information
                        <span className="ml-1 text-red-500">
                          *
                        </span>
                      </label>

                      <p className="mt-1 text-xs text-slate-500">
                        Add up to{" "}
                        {
                          MAX_CONTACTS
                        }{" "}
                        contacts.
                      </p>
                    </div>

                    <div
                      className={`text-xs font-semibold ${
                        contacts.length >=
                        MAX_CONTACTS
                          ? "text-red-600"
                          : "text-slate-500"
                      }`}
                    >
                      {
                        contacts.length
                      }{" "}
                      /{" "}
                      {
                        MAX_CONTACTS
                      }
                    </div>
                  </div>

                  {contactsError && (
                    <div className="mb-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2">
                      <p className="text-xs font-medium text-red-600">
                        {
                          contactsError
                        }
                      </p>
                    </div>
                  )}

                  <div className="space-y-3">
                    {contacts.map(
                      (
                        contact,
                        index
                      ) => {
                        const errors =
                          contactErrors[
                            contact.id
                          ] ||
                          {};

                        return (
                          <div
                            key={
                              contact.id
                            }
                            className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                          >
                            <div className="mb-3 flex items-center justify-between">
                              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Contact{" "}
                                {index +
                                  1}
                              </p>

                              {contact.isEditing && (
                                <span className="rounded-full bg-blue-100 px-2.5 py-1 text-[11px] font-semibold text-blue-700">
                                  Editing
                                </span>
                              )}
                            </div>

                            <div className="grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto]">

                              {/* DESIGNATION */}
                              <div>
                                <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                                  Designation
                                </label>

                                <input
                                  type="text"
                                  value={
                                    contact.designation
                                  }
                                  disabled={
                                    !contact.isEditing ||
                                    saving
                                  }
                                  onChange={(
                                    e
                                  ) =>
                                    updateContact(
                                      contact.id,
                                      "designation",
                                      e.target
                                        .value
                                    )
                                  }
                                  placeholder="e.g. Security"
                                  className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition ${
                                    errors.designation
                                      ? "border-red-400 bg-red-50"
                                      : contact.isEditing
                                      ? "border-slate-300 bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                      : "border-slate-200 bg-slate-100 text-slate-500"
                                  }`}
                                />

                                {errors.designation && (
                                  <p className="mt-1 text-[11px] font-medium text-red-600">
                                    {
                                      errors.designation
                                    }
                                  </p>
                                )}
                              </div>

                              {/* NAME */}
                              <div>
                                <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                                  Name
                                </label>

                                <input
                                  type="text"
                                  value={
                                    contact.name
                                  }
                                  disabled={
                                    !contact.isEditing ||
                                    saving
                                  }
                                  onChange={(
                                    e
                                  ) =>
                                    updateContact(
                                      contact.id,
                                      "name",
                                      e.target
                                        .value
                                    )
                                  }
                                  placeholder="Enter name"
                                  className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition ${
                                    errors.name
                                      ? "border-red-400 bg-red-50"
                                      : contact.isEditing
                                      ? "border-slate-300 bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                      : "border-slate-200 bg-slate-100 text-slate-500"
                                  }`}
                                />

                                {errors.name && (
                                  <p className="mt-1 text-[11px] font-medium text-red-600">
                                    {
                                      errors.name
                                    }
                                  </p>
                                )}
                              </div>

                              {/* CONTACT NUMBER */}
                              <div>
                                <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                                  Contact No
                                </label>

                                <input
                                  type="tel"
                                  inputMode="numeric"
                                  maxLength={
                                    10
                                  }
                                  value={
                                    contact.contactNo
                                  }
                                  disabled={
                                    !contact.isEditing ||
                                    saving
                                  }
                                  onChange={(
                                    e
                                  ) => {
                                    const value =
                                      e.target.value
                                        .replace(
                                          /\D/g,
                                          ""
                                        )
                                        .slice(
                                          0,
                                          10
                                        );

                                    updateContact(
                                      contact.id,
                                      "contactNo",
                                      value
                                    );
                                  }}
                                  placeholder="10-digit number"
                                  className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition ${
                                    errors.contactNo
                                      ? "border-red-400 bg-red-50"
                                      : contact.isEditing
                                      ? "border-slate-300 bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                      : "border-slate-200 bg-slate-100 text-slate-500"
                                  }`}
                                />

                                {errors.contactNo && (
                                  <p className="mt-1 text-[11px] font-medium text-red-600">
                                    {
                                      errors.contactNo
                                    }
                                  </p>
                                )}
                              </div>

                              {/* ACTION BUTTONS */}
                              <div className="flex items-end gap-2">

                                {/* EDIT */}
                                <button
                                  type="button"
                                  onClick={() =>
                                    editContact(
                                      contact.id
                                    )
                                  }
                                  disabled={
                                    saving ||
                                    contact.isEditing
                                  }
                                  title={
                                    contact.isEditing
                                      ? "Currently editing"
                                      : "Edit contact"
                                  }
                                  className={`flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-lg border transition ${
                                    contact.isEditing
                                      ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-300"
                                      : "border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100"
                                  }`}
                                >
                                  <Pencil
                                    size={
                                      17
                                    }
                                  />
                                </button>

                                {/* ADD */}
                                <button
                                  type="button"
                                  onClick={
                                    addContact
                                  }
                                  disabled={
                                    saving ||
                                    contacts.length >=
                                      MAX_CONTACTS
                                  }
                                  title={
                                    contacts.length >=
                                    MAX_CONTACTS
                                      ? "Maximum 10 contacts allowed"
                                      : "Add contact"
                                  }
                                  className={`flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-lg border transition ${
                                    contacts.length >=
                                    MAX_CONTACTS
                                      ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400"
                                      : "border-emerald-200 bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                                  }`}
                                >
                                  <Plus
                                    size={
                                      18
                                    }
                                  />
                                </button>

                                {/* REMOVE */}
                                <button
                                  type="button"
                                  onClick={() =>
                                    removeContact(
                                      contact.id
                                    )
                                  }
                                  disabled={
                                    saving ||
                                    contacts.length ===
                                      1
                                  }
                                  title={
                                    contacts.length ===
                                    1
                                      ? "At least one contact is required"
                                      : "Remove contact"
                                  }
                                  className={`flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-lg border transition ${
                                    contacts.length ===
                                    1
                                      ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400"
                                      : "border-red-200 bg-red-50 text-red-600 hover:bg-red-100"
                                  }`}
                                >
                                  <Minus
                                    size={
                                      18
                                    }
                                  />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>

                  {contacts.length >=
                    MAX_CONTACTS && (
                    <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2">
                      <p className="text-xs font-medium text-amber-700">
                        Maximum of{" "}
                        {
                          MAX_CONTACTS
                        }{" "}
                        contacts reached.
                        You cannot add
                        another contact.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* FORM BUTTONS */}
              <div className="flex shrink-0 flex-col-reverse gap-3 border-t border-slate-200 bg-white px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
                <button
                  type="button"
                  onClick={
                    closeModal
                  }
                  disabled={
                    saving
                  }
                  className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={
                    saving
                  }
                  className="rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving
                    ? "Saving..."
                    : editingId
                    ? "Update Information"
                    : "Add Information"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* VIEW MODAL */}
      {/* ================================================================= */}

      {showViewModal &&
        selectedInformation && (
          <div className="fixed inset-0 z-[55] flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
            <div className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

              <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6 sm:py-5">
                <div className="min-w-0">
                  <h2 className="truncate text-xl font-bold text-slate-800">
                    {
                      selectedInformation.title
                    }
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Important contact information
                  </p>
                </div>

                <button
                  type="button"
                  onClick={
                    closeViewModal
                  }
                  className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto p-5 sm:p-6">
                {renderViewContent()}
              </div>

              <div className="flex shrink-0 justify-end border-t border-slate-200 px-5 py-4 sm:px-6">
                <button
                  type="button"
                  onClick={
                    closeViewModal
                  }
                  className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      {/* ================================================================= */}
      {/* ANNOUNCEMENT-STYLE ALERT */}
      {/* ================================================================= */}

      {alert && (
        <AlertModal
          type={alert.type}
          message={
            alert.message
          }
          confirmText={
            alert.confirmText
          }
          cancelText={
            alert.cancelText
          }
          onConfirm={
            alert.onConfirm
          }
          onClose={
            closeAlert
          }
        />
      )}
    </div>
  );
};

export default ImportantInformation;