import s from "./Page404.module.css"
import { Link } from "react-router"
import Button from "@mui/material/Button"

export const Page404 = () => {
  return (
    <>
      <h1 className={s.title}>404</h1>
      <h2 className={s.subTitle}>page not found</h2>
      <div className={s.container}>
        <Button
          component={Link}
          to="/"
          sx={{
            display: "inline-block", // Делает кнопку блочным элементом, чтобы ее можно было центрировать
            textAlign: "center", // Центрирует текст внутри кнопки
            backgroundColor: "primary.main", // Цвет фона, можно выбрать из темы
            color: "white", // Цвет текста
            padding: "10px 20px", // Внутренние отступы
            borderRadius: "4px", // Закругленные углы
            textDecoration: "none", // Убирает стандартное подчеркивание ссылки
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Легкая тень для кнопки
            ":hover": {
              backgroundColor: "primary.dark", // Цвет фона при наведении
              boxShadow: "0px 6px 8px rgba(0, 0, 0, 0.2)", // Тень при наведении
            },
            ":focus": {
              outline: "none", // Убирает стандартную обводку фокуса
            },
            "@media (max-width:600px)": {
              padding: "8px 16px", // Уменьшаем отступы на мобильных устройствах
            },
          }}
        >
          Go to Home
        </Button>
      </div>
    </>
  )
}
