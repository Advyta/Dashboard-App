import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import Button from "./button";

type CardProps<T> = {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  title?: string;
  onRefresh?: () => void;
};

function Card<T>({ data, renderItem, title, onRefresh }: CardProps<T>) {
  return (
    <div className="card bg-gray-100/20  rounded-xl">
      <div className="card-body">
        {title && (
          <div className="flex items-center justify-between">
            <h2 className="card-title capitalize">{title}</h2>
            {/* refresh icon */}
            <Button variant="ghost" onClick={onRefresh}>
              <FontAwesomeIcon icon={faRotateRight} />
            </Button>
          </div>
        )}
        {data.map((item, idx) => renderItem(item, idx))}
      </div>
    </div>
  );
}

export default Card;
