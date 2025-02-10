import { ConfirmDialogKind } from "@pluralsight/headless-styles/npm/types/src/components/ConfirmDialog/types";
import { DeleteIcon } from "@pluralsight/icons";
import { useConfirm } from "@pluralsight/react";
import React from "react";
import styles from "./Delete.module.css";
interface DeleteProps {
  heading: string;
  kind: ConfirmDialogKind;
  text: string;
  onConfirm: () => void;
}

export const DeleteComponent: React.FC<DeleteProps> = ({
  heading,
  kind,
  text,
  onConfirm,
}) => {
  const { confirm } = useConfirm();

  async function handleShowAlert() {
    try {
      const consent = await confirm({
        heading,
        kind,
        text,
      });

      if (consent) {
        onConfirm();
      }
    } catch (error) {
      // handle error
    }
  }

  return (
    <DeleteIcon
      className={styles.iconCustom}
      onClick={handleShowAlert}
      aria-label="Delete Transaction"
    />
  );
};
