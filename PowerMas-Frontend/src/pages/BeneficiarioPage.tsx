import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBeneficiarios, deleteBeneficiario, updateBeneficiario } from "../services/api";
import type { Beneficiario, UpdateBeneficiarioDto } from "../types/index";
import BeneficiarioList from "../components/BeneficiarioList";

export default function BeneficiarioPage() {
  const [beneficiarios, setBeneficiarios] = useState<Beneficiario[]>([]);
  const [loading, setLoading] = useState(false);
  const [isEliminando, setIsEliminando] = useState(false);
  const [isActualizando, setIsActualizando] = useState(false);

  useEffect(() => {
    cargarBeneficiarios();
  }, []);

  const cargarBeneficiarios = async () => {
    setLoading(true);
    try {
      const data = await getBeneficiarios();
      setBeneficiarios(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditar = async (id: number, data: UpdateBeneficiarioDto) => {
  try {
    setIsActualizando(true);
    await updateBeneficiario(id, data);
    alert('Beneficiario actualizado correctamente');
    cargarBeneficiarios();
  } catch (error) {
    console.error(error);
    alert('Error al actualizar');
  } finally {
    setIsActualizando(false);
  }
};

  const handleEliminar = async (id: number) => {
    try {
      setIsEliminando(true);
      await deleteBeneficiario(id);
      alert('Beneficiario eliminado correctamente');
      await cargarBeneficiarios(); // refresca la tabla
    } catch (error) {
      console.error(error);
      alert('Error al eliminar el beneficiario');
    } finally{
        setIsEliminando(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 md:px-8 md:py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Beneficiarios</h1>
          <Link
            to="/registrar"
            className="w-full md:w-auto bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition text-center"
          >
            + Registrar Beneficiario
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-8">Cargando...</div>
        ) : (
          <BeneficiarioList
            beneficiarios={beneficiarios}
            onEliminar={handleEliminar}
            onEditar={handleEditar}
            isEliminando={isEliminando}
            isActualizando={isActualizando}
          />
        )}
      </div>
    </div>
  );
}
