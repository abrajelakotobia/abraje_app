import {
  Home,
  KeyRound,
  Building,
  Store,
  Hotel,
  LandPlot,
  MapPinned
} from "lucide-react";
import { ReactNode } from "react";

interface CategoryCardProps {
  icon: ReactNode;
  label: string;
  color?: string;
  bgColor?: string;
}

const CategoryCard = ({
  icon,
  label,
  color = "text-blue-500",
  bgColor = "bg-gray-100"
}: CategoryCardProps) => {
  return (
    <div className={`w-29 h-29 ${bgColor} rounded-xl flex flex-col items-center justify-center space-y-2 hover:shadow-md transition-shadow cursor-pointer`}>
      <div className={`${color} p-2 rounded-full`}>
        {icon}
      </div>
      <p className="text-sm font-medium text-gray-700 text-center px-2">{label}</p>
    </div>
  );
};

export default function Categories() {
  return (
    <div className="flex gap-4 flex-wrap p-4">
      <CategoryCard
        icon={<Home size={24} />}
        label="APPARTEMENT NEUF"
        color="text-blue-600"
        bgColor="bg-blue-50"
      />
       <CategoryCard
        icon={<Home size={24} />}
        label="APPARTEMENT"
        color="text-blue-600"
        bgColor="bg-blue-50"
      />
      <CategoryCard
        icon={<MapPinned size={24} />}
        label="TERRAINS"
        color="text-blue-600"
        bgColor="bg-blue-50"
      />
      <CategoryCard
        icon={<KeyRound size={24} />}
        label="RAIAD ET CHAMBRE"
        color="text-green-600"
        bgColor="bg-green-50"
      />
      <CategoryCard
        icon={<Building size={24} />}
        label="BIROUX ET PLATEUX"
        color="text-purple-600"
        bgColor="bg-purple-50"
      />
      <CategoryCard
        icon={<Store size={24} />}
        label="MAGASIN ET HANGAR"
        color="text-orange-600"
        bgColor="bg-orange-50"
      />
      <CategoryCard
        icon={<Hotel size={24} />}
        label="HOTEL"
        color="text-red-600"
        bgColor="bg-red-50"
      />
      <CategoryCard
        icon={<LandPlot size={24} />}
        label="VILLAS ET FERME"
        color="text-indigo-600"
        bgColor="bg-indigo-50"
      />
         <CategoryCard
        icon={<LandPlot size={24} />}
        label="MAISON"
        color="text-indigo-600"
        bgColor="bg-indigo-50"
      />
    </div>
  );
}
