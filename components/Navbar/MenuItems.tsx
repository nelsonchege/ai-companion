"use client";

interface MenuItemsProps {
  onClick: () => void;
  label: string;
}

const MenuItems: React.FC<MenuItemsProps> = ({ onClick, label }) => {
  return (
    <div
      onClick={onClick}
      className="px-4 py-3 hover:bg-gradient-to-r from-sky-500 via-blue-500 to-cyan-500 transition font-semibold"
    >
      {label}
    </div>
  );
};

export default MenuItems;
