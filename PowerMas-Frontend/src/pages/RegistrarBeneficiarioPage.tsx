import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBeneficiario } from '../services/api';
import type { CreateBeneficiarioDto, DocumentoIdentidad } from '../types';
import { DocumentoSelect } from '../components/DocumentoSelect';

const PAISES = ['Perú', 'Chile', 'Colombia'];

export default function RegistrarBeneficiarioPage() {
  const navigate = useNavigate();
  const [pais, setPais] = useState('');
  const [documento, setDocumento] = useState<DocumentoIdentidad | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState<CreateBeneficiarioDto>({
    nombres: '',
    apellidos: '',
    documentoIdentidadId: 0,
    numeroDocumento: '',
    fechaNacimiento: '',
    sexo: 'M',
  });

  const handlePaisChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPais(e.target.value);
    setDocumento(null);
    setForm({ ...form, documentoIdentidadId: 0, numeroDocumento: '' });
  };

  const handleDocumentoChange = (doc: DocumentoIdentidad) => {
    setDocumento(doc);
    setForm({ ...form, documentoIdentidadId: doc.id, numeroDocumento: '' });
  };

  const validateNumeroDocumento = (valor: string): boolean => {
    if (!documento) return false;

    const errors: Record<string, string> = {};

    if (valor.length !== documento.longitud) {
      errors.numeroDocumento = `Debe tener exactamente ${documento.longitud} caracteres`;
    }

    if (documento.soloNumeros && !/^\d+$/.test(valor)) {
      errors.numeroDocumento = 'Solo se permiten números';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNumeroDocumentoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    setForm({ ...form, numeroDocumento: valor });
    if (valor) validateNumeroDocumento(valor);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setValidationErrors({});

    if (!validateNumeroDocumento(form.numeroDocumento)) {
      return;
    }

    setLoading(true);
    try {
      await createBeneficiario(form);
      alert('Beneficiario registrado correctamente');
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al registrar beneficiario');
      alert('Error al registrar el beneficiario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 md:px-8 md:py-10">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Registrar Beneficiario</h1>
          <p className="text-gray-600">Completa el formulario para registrar un nuevo beneficiario</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 md:p-8">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* País */}
            <div>
              <label className="block text-sm font-medium text-gray-700">País</label>
              <select
                value={pais}
                onChange={handlePaisChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Selecciona un país</option>
                {PAISES.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            {/* Tipo de Documento */}
            {pais && (
              <DocumentoSelect pais={pais} onChange={handleDocumentoChange} />
            )}

            {/* Número de Documento */}
            {documento && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Número de Documento</label>
                <input
                  type="text"
                  value={form.numeroDocumento}
                  onChange={handleNumeroDocumentoChange}
                  placeholder={`${documento.longitud} caracteres${documento.soloNumeros ? ' (solo números)' : ''}`}
                  maxLength={documento.longitud}
                  className={`w-full mt-1 p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                    validationErrors.numeroDocumento ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
                {validationErrors.numeroDocumento && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.numeroDocumento}</p>
                )}
                {!validationErrors.numeroDocumento && form.numeroDocumento && (
                  <p className="mt-1 text-sm text-green-600">✓ Validado</p>
                )}
              </div>
            )}

            {/* Nombres */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Nombres</label>
              <input
                type="text"
                value={form.nombres}
                onChange={e => setForm({ ...form, nombres: e.target.value })}
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Apellidos */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Apellidos</label>
              <input
                type="text"
                value={form.apellidos}
                onChange={e => setForm({ ...form, apellidos: e.target.value })}
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Fecha de Nacimiento */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Fecha de Nacimiento</label>
              <input
                type="date"
                value={form.fechaNacimiento}
                onChange={e => setForm({ ...form, fechaNacimiento: e.target.value })}
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Sexo */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Sexo</label>
              <select
                value={form.sexo}
                onChange={e => setForm({ ...form, sexo: e.target.value as 'M' | 'F' })}
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
              </select>
            </div>

            {/* Botones */}
            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition font-semibold"
              >
                {loading ? 'Registrando...' : 'Registrar'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition font-semibold"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}