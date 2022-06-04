import React, { useEffect, useState } from "react";
import { MoreHorizontal } from "react-feather";
import TextareaAutosize from 'react-textarea-autosize';

import Card from "../Card/Card";
import Dropdown from "../Dropdown/Dropdown";
import Editable from "../Editabled/Editable";

import "./Board.css";

function Board(props) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [boardTitle, setBoardTitle] = useState("")
  const [prevTitle, setPrevTitle] = useState("")
  useEffect(() => {
    setBoardTitle(props.board?.title)
    setPrevTitle(props.board?.title)
  }, [props.board?.title])

  return (
    <div className="board">
      <div className="board_header">
        <div className="board_header_title">
          <TextareaAutosize minRows={1} placeholder="Комментарий" className="board-title col-10 ml-3 p-1" value={boardTitle} onChange={(e) => setBoardTitle(e.target.value)} onBlur={(e) => props.updateTitle(prevTitle, e.target.value)} />
          <span>{props.board?.cards?.length || 0}</span>
        </div>
        <div
          className="board_header_title_more"
          onClick={() => setShowDropdown(true)}
        >
          <MoreHorizontal />
          {showDropdown && (
            <Dropdown
              class="board_dropdown"
              onClose={() => setShowDropdown(false)}
            >
              <p onClick={() => props.removeBoard()}>Delete Board</p>
            </Dropdown>
          )}
        </div>
      </div>
      <div className="board_cards custom-scroll">
        {props.board?.cards?.map((item) => (
          <Card
            key={item.id}
            card={item}
            boardId={props.board.id}
            removeCard={props.removeCard}
            dragEntered={props.dragEntered}
            dragEnded={props.dragEnded}
            updateCard={props.updateCard}
          />
        ))}
        <Editable
          text="+ Добавить карточку"
          placeholder="Введите название карточки"
          displayClass="board_add-card"
          editClass="board_add-card_edit"
          onSubmit={(value) => props.addCard(props.board?.id, value)}
        />
      </div>
    </div>
  );
}

export default Board;
