import { Menu } from "../components/Menu.component";
import avatar from "../assets/avatar.svg";
import PathCard from "../components/PathPage/PathCard.component";
import bunny from "../assets/PathsPage/bunny-path.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate para redirección
import { pathsGet } from "../services/Path.service";

interface IPath {
  title: string;
  imageUrl: string;
}

function Paths() {
  const [paths, setPaths] = useState<IPath[]>([]);
  const navigate = useNavigate(); // Declara el hook useNavigate

  const handlePaths = async() => {
    try {
      const response = await pathsGet();
      const data = response.map((path) => ({
        title: path.name,
        imageUrl: 'https://i.ibb.co/VQTxs8P/reproductive-health-path.png',
      }));
      console.log("response", response);
      console.log("data", data);
      setPaths(data);
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
    }
  };

  console.log("paths", paths);

  useEffect(() => {
    handlePaths();
  }, []);

  // Función para manejar el clic en un PathCard
  const handlePathClick = (index: number) => {
    navigate(`/paths/${index}`);
  };

  return (
    <div className="flex flex-col items-center bg-[#F29FB3] min-h-screen">
      <Menu title="Ana Maria" avatarUrl={avatar} />

      <h1 className="mb-10 font-semibold text-3xl text-white">Routes</h1>

      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 px-6 w-full max-w-6xl">
        {paths.map((path, index) => (
          <div
            key={index}
            className="cursor-pointer"
            onClick={() => handlePathClick(index)} // Redirige al hacer clic
          >
            <PathCard title={path.title} imageUrl={path.imageUrl} />
          </div>
        ))}
      </div>

      <p className="mt-12 text-lg text-slate-700">More coming soon</p>

      <div className="right-0 bottom-0 absolute p-4">
        <img src={bunny} alt="Bunny Icon" className="w-16 h-16" />
      </div>
    </div>
  );
}

export default Paths;
