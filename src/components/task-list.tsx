import React, { useCallback, useRef } from 'react'
import { AnimatePresence, View } from 'moti'
import {
  PanGestureHandlerProps,
  ScrollView
} from 'react-native-gesture-handler'
import TaskItem from './task-item'
import { makeStyledComponent } from '../utils/styled'

const StyledView = makeStyledComponent(View)
const StylesScrollView = makeStyledComponent(ScrollView)

interface TaskItemData {
  id: string
  subject: string
  done: boolean
}

interface TaskListProps {
  data: Array<TaskItemData>
  editingItemId: string | null
  onToggleItem: (item: TaskItemData) => void
  onChangeSubject: (item: TaskItemData, newSubject: string) => void
  onFinishEditing: (item: TaskItemData) => void
  onPressLabel: (item: TaskItemData) => void
  onRemoveItem: (item: TaskItemData) => void
}

interface TaskItemProps
  extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
  data: TaskItemData
  isEditing: boolean
  onToggleItem: (item: TaskItemData) => void
  onChangeSubject: (item: TaskItemData, newSubject: string) => void
  onFinishEditing: (item: TaskItemData) => void
  onPressLabel: (item: TaskItemData) => void
  onRemove: (item: TaskItemData) => void
}

export const AnimatedTaskItem = (props: TaskItemProps) => {
  const {
    data,
    isEditing,
    onChangeSubject,
    onFinishEditing,
    onRemove,
    onToggleItem,
    simultaneousHandlers,
    onPressLabel
  } = props

  const handleToggleCheckbox = useCallback(() => {
    onToggleItem(data)
  }, [data, onToggleItem])

  const handleChangeSubject = useCallback(
    subject => {
      onChangeSubject(data, subject)
    },
    [data, onToggleItem]
  )

  const handleFinishEditing = useCallback(() => {
    onFinishEditing(data)
  }, [data, onFinishEditing])

  const handlePressLabel = useCallback(() => {
    onPressLabel(data)
  }, [data, onPressLabel])

  const handleRemove = useCallback(() => {
    onRemove(data)
  }, [data, onRemove])

  return (
    <StyledView
      w="full"
      from={{ opacity: 0, scale: 0.5, marginBottom: -4 }}
      animate={{
        opacity: 1,
        scale: 1,
        marginBottom: 0
      }}
      exit={{
        opacity: 0,
        scale: 0.5,
        marginBottom: -46
      }}
    >
      <TaskItem
        simultaneousHandlers={simultaneousHandlers}
        subject={data.subject}
        isDone={data.done}
        isEditing={isEditing}
        onToggleCheckbox={handleToggleCheckbox}
        onChangeSubject={handleChangeSubject}
        onFinishEditing={handleFinishEditing}
        onPressLabel={handlePressLabel}
        onRemove={handleRemove}
      />
    </StyledView>
  )
}

export default function TaskList(props: TaskListProps) {
  const {
    data,
    editingItemId,
    onChangeSubject,
    onFinishEditing,
    onPressLabel,
    onRemoveItem,
    onToggleItem
  } = props
  const refScrollView = useRef(null)

  return (
    <StylesScrollView w="full" ref={refScrollView}>
      <AnimatePresence>
        {data.map(item => (
          <AnimatedTaskItem
            key={item.id}
            data={item}
            simultaneousHandlers={refScrollView}
            isEditing={item.id === editingItemId}
            onChangeSubject={onChangeSubject}
            onFinishEditing={onFinishEditing}
            onPressLabel={onPressLabel}
            onToggleItem={onToggleItem}
            onRemove={onRemoveItem}
          />
        ))}
      </AnimatePresence>
    </StylesScrollView>
  )
}
