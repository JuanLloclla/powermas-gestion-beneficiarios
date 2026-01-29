import type { UpdateBeneficiarioDto } from "../../types";
import { useState, useEffect } from "react";

interface EditarBeneficiarioProps {
  isOpen: boolean;
  onClose: () => void;
  beneficiario: UpdateBeneficiarioDto | null;
  onConfirm: (id: number, data: UpdateBeneficiarioDto) => Promise<void>;
  isActualizando: boolean;
}

export default function EditarBeneficiario({
  isOpen,
  onClose,
  beneficiario,
  onConfirm,
  isActualizando,
}: EditarBeneficiarioProps) {
  const [form, setForm] = useState<UpdateBeneficiarioDto | null>(null);

  useEffect(() => {
    if (beneficiario) {
      setForm({
        ...beneficiario,
      fechaNacimiento: beneficiario.fechaNacimiento.split('T')[0]
      });
    }
  }, [beneficiario]);

  if (!isOpen || !beneficiario) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;

    await onConfirm(form.id, form);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Editar Beneficiario</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Nombres</label>
            <input
              type="text"
              value={form?.nombres || ""}
              onChange={(e) =>
                setForm((prev) =>
                  prev ? { ...prev, nombres: e.target.value } : null,
                )
              }
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Apellidos</label>
            <input
              type="text"
              value={form?.apellidos || ""}
              onChange={(e) =>
                setForm((prev) =>
                  prev ? { ...prev, apellidos: e.target.value } : null,
                )
              }
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Fecha de Nacimiento
            </label>
            <input
              type="date"
              value={form?.fechaNacimiento || ""}
              onChange={(e) =>
                setForm((prev) =>
                  prev ? { ...prev, fechaNacimiento: e.target.value } : null,
                )
              }
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Sexo</label>
            <select
              value={form?.sexo || ""}
              onChange={(e) =>
                setForm((prev) =>
                  prev ? { ...prev, sexo: e.target.value as "M" | "F" } : null,
                )
              }
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              required
            >
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
            </select>
          </div>

          <div className="flex gap-2 pt-4">
            <button
              type="submit"
              disabled={isActualizando}
              className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 font-semibold cursor-pointer"
            >
              {isActualizando ? "Actualizando..." : "Guardar"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400 font-semibold cursor-pointer"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
