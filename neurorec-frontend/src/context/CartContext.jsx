import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { fetchCourses } from "../services/courseService.js";

const CART_KEY = "neurorec_cart";
const MY_COURSES_KEY = "neurorec_my_courses";

export const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [catalog, setCatalog] = useState([]);
  const [catalogError, setCatalogError] = useState("");

  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Erro ao carregar carrinho:", error);
      return [];
    }
  });

  const [myCourses, setMyCourses] = useState(() => {
    try {
      const saved = localStorage.getItem(MY_COURSES_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Erro ao carregar meus cursos:", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(MY_COURSES_KEY, JSON.stringify(myCourses));
  }, [myCourses]);

  useEffect(() => {
    const load = async () => {
      setCatalogError("");
      try {
        const data = await fetchCourses();
        setCatalog(Array.isArray(data) ? data : []);
        if (!data || data.length === 0) {
          setCatalogError("Catálogo vazio no servidor.");
        }
      } catch (err) {
        console.error("Erro ao carregar catálogo:", err);
        setCatalog([]);
        setCatalogError("Não foi possível sincronizar o catálogo com o servidor.");
      }
    };

    load();
  }, []);

  const addToCart = useCallback((courseId) => {
    setCart((prev) => {
      if (prev.includes(courseId)) return prev;
      return [...prev, courseId];
    });
  }, []);

  const removeFromCart = useCallback((courseId) => {
    setCart((prev) => prev.filter((id) => id !== courseId));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const finalizePurchase = useCallback(() => {
    setMyCourses((prev) => Array.from(new Set([...prev, ...cart])));
    setCart([]);
  }, [cart]);

  const cartCourses = useMemo(
    () => cart.map((id) => catalog.find((course) => course.id === id)).filter(Boolean),
    [cart, catalog]
  );

  const myCoursesList = useMemo(
    () => myCourses.map((id) => catalog.find((course) => course.id === id)).filter(Boolean),
    [myCourses, catalog]
  );

  const value = useMemo(
    () => ({
      cart,
      myCourses,
      cartCourses,
      myCoursesList,
      catalog,
      catalogError,
      addToCart,
      removeFromCart,
      clearCart,
      finalizePurchase,
    }),
    [
      cart,
      myCourses,
      cartCourses,
      myCoursesList,
      catalog,
      catalogError,
      addToCart,
      removeFromCart,
      clearCart,
      finalizePurchase,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
