/* eslint-disable indent */
import { getDraggableStyle, getDroppableStyle, reorder } from '@/lib/dnd';
import { useAppDispatch } from '@/lib/store';
import {
  menus,
  menuSelected,
  setIsTabChanged,
  setIsUpdating,
  setMenuSelectedState,
  setMenusState,
} from '@/lib/store/fetures/menuSlice';
import { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import styles from '../../../pages/system/menu/style/menu.module.css';
import DepsTwo from './depsTwo';

const DepsOne = ({ data }) => {
  //local state:
  const [depsOneData, setDepsOneData] = useState(data);

  //global state:
  const dispatch = useAppDispatch();
  const _menus = useSelector(menus);
  const _menuSelected = useSelector(menuSelected);

  //react hooks:
  useEffect(() => {
    setDepsOneData(_menus);
  }, [_menus, _menuSelected, depsOneData]);

  //component function:
  const getReorderedData = (sourceIndex, destinationIndex) => {
    const reorderedList = reorder(depsOneData, sourceIndex, destinationIndex);
    setDepsOneData(reorderedList);
    dispatch(setMenusState(reorderedList));
  };

  const get2DReorderedData = (data, sourceIndex, destinationIndex, depsOneIndex) => {
    const _depsOneData = JSON.parse(JSON.stringify(depsOneData));
    const reorderedList = reorder(data, sourceIndex, destinationIndex);
    _depsOneData[depsOneIndex].childs = reorderedList;
    setDepsOneData(_depsOneData);
    dispatch(setMenusState(_depsOneData));
  };

  const get3DReorderData = (data, sourceIndex, destinationIndex, depsOneIndex, depsTwoIndex) => {
    const _depsOneData = JSON.parse(JSON.stringify(depsOneData));
    const reorderedList = reorder(data, sourceIndex, destinationIndex);
    _depsOneData[depsOneIndex].childs[depsTwoIndex].childs = reorderedList;
    setDepsOneData(_depsOneData);
    dispatch(setMenusState(_depsOneData));
  };

  const onDragEnd = (result) => {
    const { destination, source, type } = result;
    if (!result.destination) {
      return;
    }
    type === 'c00c68bfe45a874c3477ad7dc6deda43'
      ? getReorderedData(source.index, destination.index)
      : type.length === 1
      ? get2DReorderedData(
          depsOneData[parseInt(type, 10)].childs,
          source.index,
          destination.index,
          type
        )
      : type.length === 2
      ? get3DReorderData(
          depsOneData[parseInt(type[0], 10)].childs[parseInt(type[1], 10)].childs,
          source.index,
          destination.index,
          type[0],
          type[1]
        )
      : null;
    return;
  };

  const handleMenuListClick = (e, v) => {
    e.preventDefault();
    dispatch(setIsUpdating(true));
    dispatch(setMenuSelectedState(v));
    dispatch(setIsTabChanged(false));
  };
  return (
    <>
      {/*<DragDropContext onDragEnd={onDragEnd}>*/}
      {/*  <Droppable droppableId="droppable" type="c00c68bfe45a874c3477ad7dc6deda43">*/}
      {/*    {(provided, snapshot) => (*/}
      {/*      <div*/}
      {/*        ref={provided.innerRef}*/}
      {/*        {...provided.droppableProps}*/}
      {/*        style={getDroppableStyle(snapshot.isDraggingOver)}*/}
      {/*      >*/}
      {/*        {_menus?.map((v, i) => {*/}
      {/*          return (*/}
      {/*            <Draggable key={v.menuSeq} draggableId={v.menuSeq.toString()} index={i}>*/}
      {/*              {(provided, snapshot) => (*/}
      {/*                <div*/}
      {/*                  key={i}*/}
      {/*                  ref={provided.innerRef}*/}
      {/*                  {...provided.dragHandleProps}*/}
      {/*                  {...provided.draggableProps}*/}
      {/*                  className={`${styles.menuContent} ${styles.menuContentsFirstdepts} `}*/}
      {/*                  style={getDraggableStyle(*/}
      {/*                    snapshot.isDragging,*/}
      {/*                    provided.draggableProps.style*/}
      {/*                  )}*/}
      {/*                >*/}
      {/*                  <div className="el">*/}
      {/*                    <div*/}
      {/*                      className={styles.firstDepName}*/}
      {/*                      onClick={(e) => handleMenuListClick(e, v)}*/}
      {/*                    >*/}
      {/*                      {v.menuNm}*/}
      {/*                    </div>*/}
      {/*                    <DepsTwo index={i} data={v.childs} />*/}
      {/*                  </div>*/}
      {/*                </div>*/}
      {/*              )}*/}
      {/*            </Draggable>*/}
      {/*          );*/}
      {/*        })}*/}
      {/*        {provided.placeholder}*/}
      {/*      </div>*/}
      {/*    )}*/}
      {/*  </Droppable>*/}
      {/*</DragDropContext>*/}
    </>
  );
};

export default DepsOne;
