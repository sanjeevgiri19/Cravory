import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AvailableMenus from "../AvailableMenus";

const MenuSearchPage = () => {
  const { foodName } = useParams();
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetch(`https://cravory-y3qu.onrender.com/v1/menu/all`)
    fetch(`http://localhost:8000/api/v1/menu/all`)
      .then((res) => res.json())
      .then((data) => {
        // Filter menus by food name (case-insensitive)
        const filtered = data.menus.filter((menu: any) =>
          menu.name.toLowerCase().includes(foodName?.toLowerCase() || "")
        );
        setMenus(filtered);
        setLoading(false);
      });
  }, [foodName]);

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 capitalize">{foodName} Menus</h1>
      {loading ? <div>Loading...</div> : <AvailableMenus menus={menus} />}
    </div>
  );
};

export default MenuSearchPage;
