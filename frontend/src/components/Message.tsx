import { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";

type Props = {
  messagem: string | null;
  isTaskUpdated: boolean;
};

const Message = ({ messagem, isTaskUpdated }: Props) => {
  const [visibleMessage, setVisibleMessage] = useState<string | null>(null);

  useEffect(() => {
    if (messagem && typeof messagem === "string") {
      setVisibleMessage(messagem);

      const timer = setTimeout(() => {
        setVisibleMessage(null);
      }, 3000); // Tempo aumentado para melhor visualização

      return () => clearTimeout(timer);
    }
  }, [messagem, isTaskUpdated]);

  return (
    <div>
      {visibleMessage ? (
        <Alert severity="success">{visibleMessage}</Alert>
      ) : null}
    </div>
  );
};

export default Message;
