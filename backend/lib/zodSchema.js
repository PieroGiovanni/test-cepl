import { z } from "zod";

export const quantityValidator = z.object({
  quantity: z
    .number({
      required_error: "Cantidad requerida",
      invalid_type_error: "Cantidad inválida",
    })
    .positive("Cantidad tiene que ser mayor a 0"),
});
