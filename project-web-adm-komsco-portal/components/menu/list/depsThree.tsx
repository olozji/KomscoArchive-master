/* eslint-disable prettier/prettier */
/* eslint-disable indent */
import { getDraggableStyle, getDroppableStyle } from '@/lib/dnd';
import { useAppDispatch } from '@/lib/store';
import {
  menus,
  menuSelected,
  setMenuSelectedState,
  setIsTabChanged,
  setIsUpdating,
} from '@/lib/store/fetures/menuSlice';
import { useEffect, useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import styles from '../../../pages/system/menu/style/menu.module.css';

const DepsThree = ({ firstIndex, secondIndex }) => {
  //local state:
  const [depsOneNumber] = useState(firstIndex);
  const [depsTwoNumber] = useState(secondIndex);

  //global state:
  const dispatch = useAppDispatch();
  const _menus = useSelector(menus);
  const _menuSelected = useSelector(menuSelected);

  //react hooks:
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  useEffect(() => {}, [_menus, _menuSelected]);

  //component function:
  const handleMenuListClick = (e, v) => {
    e.preventDefault();
    dispatch(setIsUpdating(true));
    dispatch(setMenuSelectedState(v));
    dispatch(setIsTabChanged(false));
  };

  return (
    <Droppable
      droppableId={`droppable_${depsOneNumber}${depsTwoNumber}`}
      type={`${depsOneNumber}${depsTwoNumber}`}
    >
      {(provided, snapshot) => (
        <div ref={provided.innerRef} style={getDroppableStyle(snapshot.isDraggingOver)}>
          {_menus && _menus.length > 0
            ? _menus[depsOneNumber].childs[depsTwoNumber].childs.map((v, i) => (
                <Draggable
                  key={`${depsOneNumber}${depsTwoNumber}${i}`}
                  draggableId={`${depsOneNumber}${depsTwoNumber}${i}`}
                  index={i}
                >
                  {(provided, snapshot) => (
                    <div
                      className={`${styles.menuContent} ${styles.menuContentsThrdDepts}`}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getDraggableStyle(snapshot.isDragging, provided.draggableProps.style)}
                    >
                      <div
                        className={styles.thrdDepName}
                        onClick={(e) => handleMenuListClick(e, v)}
                      >
                        {v.menuNm}
                      </div>
                    </div>
                  )}
                </Draggable>
              ))
            : null}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default DepsThree;
