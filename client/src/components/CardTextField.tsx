import React from "react";
import { ICardSpanProps } from "../types";

export default function CardTextField({ title, value }: ICardSpanProps) {
  return (
    <span className="block text-lg">
      <span className="font-medium">{title}: </span>
      {value}
    </span>
  );
}
