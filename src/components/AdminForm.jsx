import React, { useMemo, useRef, useState } from 'react';
import { upload } from '@vercel/blob/client';
import { Icon } from '../Icon';
import { ServiceImage } from './ServiceImage';
import { AMENITY_CATALOG, EMPTY_SERVICE, ICON_OPTIONS, MOCK_IMAGE_OPTIONS, SERVICE_TYPES } from '../data/constants';

export const AdminForm = ({ initialService, onSubmit, onCancel, submitting = false }) => {
  const [formData, setFormData] = useState(() => ({
    ...EMPTY_SERVICE,
    ...(initialService || {}),
    price: initialService?.price ?? "",
    paxLimit: initialService?.paxLimit ?? "",
    amenities: initialService?.amenities ?? EMPTY_SERVICE.amenities
  }));
  const fileInputRef = useRef(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState("");

  const previewService = useMemo(() => ({
    name: formData.name || "Vista previa",
    imageUrl: formData.imageUrl
  }), [formData.imageUrl, formData.name]);

  const update = (field, value) => setFormData((current) => ({ ...current, [field]: value }));

  const sanitizeFileName = (name) => name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9.]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadError("");

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setUploadError("Usa una imagen JPG, PNG o WebP.");
      event.target.value = "";
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setUploadError("La imagen debe pesar menos de 8 MB.");
      event.target.value = "";
      return;
    }

    setUploadingImage(true);
    setUploadProgress(0);
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 45000);

    try {
      const safeName = sanitizeFileName(file.name) || `servicio-${Date.now()}.jpg`;
      const pathname = `servicios/${Date.now()}-${safeName}`;
      const blob = await upload(pathname, file, {
        access: 'public',
        handleUploadUrl: '/api/admin-upload-image',
        abortSignal: controller.signal,
        onUploadProgress: ({ percentage }) => {
          setUploadProgress(Math.max(1, Math.round(percentage || 0)));
        },
      });
      update("imageUrl", blob.url);
      setUploadProgress(100);
    } catch (error) {
      const message = error?.name === 'AbortError'
        ? "La subida tardó demasiado. Prueba una imagen más liviana o vuelve a intentarlo."
        : error?.message || "No se pudo subir la imagen.";
      setUploadError(message);
    } finally {
      window.clearTimeout(timeoutId);
      setUploadingImage(false);
      event.target.value = "";
    }
  };

  const toggleAmenity = (key) => {
    setFormData((current) => {
      const has = current.amenities?.includes(key);
      const next = has ? current.amenities.filter((amenity) => amenity !== key) : [...(current.amenities || []), key];
      return { ...current, amenities: next };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const saved = await onSubmit({
      ...formData,
      price: Number(formData.price),
      paxLimit: Number(formData.paxLimit),
      imageUrl: formData.imageUrl.trim(),
      amenities: formData.amenities || []
    });
    if (saved && !initialService) setFormData(EMPTY_SERVICE);
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/15 outline-none bg-slate-50 transition";
  const labelClass = "block text-xs font-bold uppercase tracking-widest text-slate-500 mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="aspect-[16/9] rounded-2xl bg-slate-100 overflow-hidden border border-slate-200">
        <ServiceImage service={previewService} className="w-full h-full object-cover" />
      </div>

      <div>
        <label className={labelClass}>Imagen *</label>
        <input required type="text" value={formData.imageUrl} onChange={(event) => update("imageUrl", event.target.value)} className={inputClass} placeholder="/vehiculos/tahoe-chauffeur.jpg" />
        <div className="mt-3">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleImageUpload}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploadingImage || submitting}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-200 bg-cyan-50 hover:bg-cyan-100 text-cyan-800 px-4 py-3 text-sm font-bold transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {uploadingImage ? (
              <>
                <Icon name="Loader" size={18} className="animate-spin" /> Subiendo imagen{uploadProgress ? ` ${uploadProgress}%` : "..."}
              </>
            ) : (
              <>
                <Icon name="Upload" size={18} /> Subir desde dispositivo
              </>
            )}
          </button>
          <p className="text-xs text-slate-500 mt-2">JPG, PNG o WebP. Recomendado: fotos reales horizontales, menos de 8 MB.</p>
          {uploadError && <p className="text-rose-500 text-sm mt-2 flex items-center gap-1"><Icon name="AlertCircle" size={14} /> {uploadError}</p>}
        </div>
        <div className="grid grid-cols-2 gap-2 mt-3">
          {MOCK_IMAGE_OPTIONS.map((imageOption) => (
            <button key={imageOption.url} type="button" onClick={() => update("imageUrl", imageOption.url)} className="text-xs bg-slate-50 hover:bg-cyan-50 text-slate-700 hover:text-cyan-700 border border-slate-200 hover:border-cyan-200 px-3 py-2 rounded-lg font-semibold transition">
              {imageOption.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className={labelClass}>Nombre *</label>
        <input required type="text" value={formData.name} onChange={(event) => update("name", event.target.value)} className={inputClass} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Tipo *</label>
          <div className="relative">
            <select value={formData.type} onChange={(event) => update("type", event.target.value)} className={`${inputClass} appearance-none`}>
              {Object.entries(SERVICE_TYPES).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-500"><Icon name="ChevronDown" size={16} /></div>
          </div>
        </div>
        <div>
          <label className={labelClass}>Ícono *</label>
          <div className="relative">
            <select value={formData.icon} onChange={(event) => update("icon", event.target.value)} className={`${inputClass} appearance-none`}>
              {ICON_OPTIONS.map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-500"><Icon name="ChevronDown" size={16} /></div>
          </div>
        </div>
      </div>

      <div>
        <label className={labelClass}>Origen *</label>
        <input required type="text" value={formData.location} onChange={(event) => update("location", event.target.value)} className={inputClass} />
      </div>

      <div>
        <label className={labelClass}>Destino *</label>
        <input required type="text" value={formData.destination} onChange={(event) => update("destination", event.target.value)} className={inputClass} />
      </div>

      <div>
        <label className={labelClass}>Descripción *</label>
        <textarea required rows="3" value={formData.description} onChange={(event) => update("description", event.target.value)} className={`${inputClass} resize-none`}></textarea>
      </div>

      <div>
        <label className={labelClass}>Amenities</label>
        <div className="flex flex-wrap gap-2">
          {Object.entries(AMENITY_CATALOG).map(([key, amenity]) => {
            const active = formData.amenities?.includes(key);
            return (
              <button
                key={key}
                type="button"
                onClick={() => toggleAmenity(key)}
                className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-full border transition ${active ? "bg-cyan-600 text-white border-cyan-600 shadow-md" : "bg-white text-slate-700 border-slate-200 hover:border-cyan-300"}`}
              >
                <Icon name={amenity.icon} size={14} />
                {amenity.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Costo ($) *</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 font-bold">$</div>
            <input required type="number" min="0" value={formData.price} onChange={(event) => update("price", event.target.value)} className={`${inputClass} pl-8`} />
          </div>
        </div>
        <div>
          <label className={labelClass}>Pax máx *</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400"><Icon name="Users" size={16} /></div>
            <input required type="number" min="1" value={formData.paxLimit} onChange={(event) => update("paxLimit", event.target.value)} className={`${inputClass} pl-10`} />
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        {onCancel && (
          <button type="button" onClick={onCancel} disabled={submitting} className="sm:w-1/3 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3.5 rounded-xl font-bold transition flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
            <Icon name="X" size={18} /> Cancelar
          </button>
        )}
        <button type="submit" disabled={submitting || uploadingImage} className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white py-3.5 rounded-xl font-bold text-lg transition shadow-md flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
          {submitting ? <Icon name="Loader" size={20} className="animate-spin" /> : <Icon name="Save" size={20} />}
          {submitting ? "Guardando..." : initialService ? "Guardar cambios" : "Guardar servicio"}
        </button>
      </div>
    </form>
  );
};
