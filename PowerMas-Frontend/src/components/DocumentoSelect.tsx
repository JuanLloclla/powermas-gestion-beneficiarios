import { useEffect, useState } from 'react';
import { getDocumentosPorPais } from '../services/api';
import type { DocumentoIdentidad } from '../types';

interface DocumentoSelectProps {
  pais: string;
  onChange: (documento: DocumentoIdentidad) => void;
}

export const DocumentoSelect = ({ pais, onChange }: DocumentoSelectProps) => {
  const [documentos, setDocumentos] = useState<DocumentoIdentidad[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (pais) {
      setLoading(true);
      getDocumentosPorPais(pais)
        .then(data => setDocumentos(data))
        .catch(error => console.error(error))
        .finally(() => setLoading(false));
    }
  }, [pais]);

  return (
    <div>
      <label className="block text-sm font-medium">Tipo de Documento</label>
      <select
        onChange={(e) => {
          const doc = documentos.find(d => d.id === parseInt(e.target.value));
          if (doc) onChange(doc);
        }}
        className="w-full p-2 border rounded mt-1"
        disabled={loading}
        required
      >
        <option value="">Selecciona un documento</option>
        {documentos.map(doc => (
          <option key={doc.id} value={doc.id}>
            {doc.nombre}
          </option>
        ))}
      </select>
    </div>
  );
};