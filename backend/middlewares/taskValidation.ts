import { body, ValidationChain } from "express-validator";

export const addTaskValidation = (): ValidationChain[] => {
  return [body("title").isString().withMessage("O título é obrigatório")];
};

export const taskUpdateValidation = (): ValidationChain[] => {
  return [
    body("title")
      .optional()
      .isString()
      .withMessage("O título é obrigatório")
      .isLength({ min: 1 })
      .withMessage("O título precisa ter no mínimo 1 caractere"),
  ];
};
