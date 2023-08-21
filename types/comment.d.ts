import { UserResponse } from '@/redux/reducers/userSlice';
export type CommentUpdateData = {
  formData: FormData;
  id: string;
  commentId: number;
};

export type CommentUploadData = Pick<CommentUpdateData, 'formData' | 'id'>;
export type CommentDelete = Pick<CommentUpdateData, 'commentId' | 'id'>;

export interface CommentData {
  comment: string;
  commentId: number;
  nickname: string;
  userImage: string;
  createdAt: string;
  updateAt: string;
  preset?: number;
}

export type CommentBoxProps = {
  onClickUpdateEvent: (commentId: number, preComment: string) => void;
  onClickDeleteEvent: (commentId: number) => void;
  updateButtonActive: (commentId: number) => void;
  active: number | null;
  data: CommentData;
  loggedUser: UserResponse | undefined;
};

export interface CommentFormProps {
  isOpen: boolean;
  onSubmitHandler: (e: React.FormEvent) => void;
  closeForm: () => void;
  closeComment: () => void;
  comment: string;
  onChangeCommentHandler: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  editTitle: string;
  editButton: string;
}

export type commentProps = {
  data: CommentData[];
  id: string;
  userData: UserResponse | undefined;
};

export type commentEditState = {
  show: boolean;
  action: 'create' | 'edit' | '';
  uiTitle: string;
  buttonText: string;
  commentId: number;
};

export type modalState = {
  actionText: string;
  modalMessge: string;
  onClickEvent: (() => void) | null;
};
