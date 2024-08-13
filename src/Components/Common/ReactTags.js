import { useState } from "react";
import '../../assets/scss/pages/reactTags.scss';
import { WithContext as ReactTags } from "react-tag-input";

const KeyCodes = {
    comma: 188,
    enter: 13,
  };
  
  const delimiters = [KeyCodes.comma, KeyCodes.enter];
  
  const InputTags = ({tags,handleDelete,handleAddition}) => {
 
    return (
      <div id="tags">
        <ReactTags
          tags={tags}
          delimiters={delimiters}
          handleDelete={handleDelete}
          handleAddition={handleAddition}
          inputFieldPosition="bottom"
          // autocomplete
          allowDragDrop={false}
        />
      </div>
    );
  };
  
  export default InputTags;