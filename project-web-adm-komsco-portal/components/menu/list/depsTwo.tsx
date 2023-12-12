/* eslint-disable indent */
import { getDraggableStyle, getDroppableStyle } from '@/lib/dnd';
import { useAppDispatch } from '@/lib/store';
import {
  menus,
  menuSelected,
  setIsUpdating,
  setMenuSelectedState,
  setIsTabChanged,
} from '@/lib/store/fetures/menuSlice';
import { useEffect, useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import styles from '../../../pages/system/menu/style/menu.module.css';
import DepsThree from './depsThree';

const DepsTwo = ({ data, index }) => {
  //local state:
  const [depsOneNumber] = useState(index);
  const [_, setDepsTwoData] = useState(data);

  //global state:
  const dispatch = useAppDispatch();
  const _menus = useSelector(menus);
  const _menuSelected = useSelector(menuSelected);

  //react hooks:
  useEffect(() => {
    setDepsTwoData(data);
  }, [_menus, _menuSelected]);

  //component function:
  const handleMenuListClick = (e, v) => {
    e.preventDefault();
    dispatch(setIsUpdating(true));
    dispatch(setMenuSelectedState(v));
    dispatch(setIsTabChanged(false));
  };

  return (
    <>
      <Droppable droppableId={`droppable${depsOneNumber}`} type={`${depsOneNumber}`}>
        {(provided, snapshot) => (
          <div ref={provided.innerRef} style={getDroppableStyle(snapshot.isDraggingOver)}>
            {_menus && _menus.length > 0
              ? _menus[depsOneNumber].childs.map((v, i) => (
                  <Draggable
                    key={`${depsOneNumber}${i}`}
                    draggableId={`${depsOneNumber}${i}`}
                    index={i}
                  >
                    {(provided, snapshot) => (
                      <div
                        className={`${styles.menuContentsSecdepts}`}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getDraggableStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        <div
                          onClick={(e) => {
                            handleMenuListClick(e, v);
                          }}
                          className={styles.secondDepName}
                        >
                          {v.menuNm}
                        </div>
                        <DepsThree firstIndex={depsOneNumber} secondIndex={i} />
                      </div>
                    )}
                  </Draggable>
                ))
              : null}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </>
  );
};

export default DepsTwo;
