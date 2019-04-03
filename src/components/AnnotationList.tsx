import React from "react";
import { Annotation } from "../models/annotation";

import "./AnnotationList.css";

interface IProps {
  annotations: Annotation[];
  selectedAnnotation: Annotation | null;
  onClickAnnotation(annotation: Annotation): void;
}

const AnnotationList = (props: IProps) => {
  return (
    <div>
      <h3>List of Annotations</h3>
      <ol>
        {props.annotations.map(annotation => {
          let className = "annotationItem";
          if (annotation == props.selectedAnnotation) {
            className += " annotationItem--selected";
          }
          return (
            <li
              className={className}
              onClick={() => props.onClickAnnotation(annotation)}
            >
              {annotation.name} lines:{annotation.lines.length}
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default AnnotationList;