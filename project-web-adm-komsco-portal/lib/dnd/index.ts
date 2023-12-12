export const getDraggableStyle = (isDragging, draggableStyle) => {
  return {
    userSelect: 'none',
    background: isDragging ? 'lightgreen' : 'grey',
    ...draggableStyle,
  };
};

export const getDroppableStyle = (isDraggingOver) => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
});

export const reorder = (data, startIndex, endIndex) => {
  const temp = [...data];
  const [removed] = temp.splice(startIndex, 1);
  temp.splice(endIndex, 0, removed);
  const result = temp.map((v, i) => {
    return {
      menuSeq: v.menuSeq,
      menuNm: v.menuNm,
      lnknSiteCd: v.lnknSiteCd,
      menuLevelCd: v.menuLevelCd,
      uprnMenuSeq: v.uprnMenuSeq,
      menuDesc: v.menuDesc,
      menuConnUrl: v.menuConnUrl,
      menuSerNo: i + 1,
      uzYn: v.uzYn,
      frstRgsrId: v.frstRgsrId,
      frstRegDttm: v.frstRegDttm,
      lastEdtrId: v.lastEdtrId,
      lastChngDttm: v.lastChngDttm,
      menuXprYn: v.menuXprYn,
      childs: v.childs,
    };
  });
  return result;
};
