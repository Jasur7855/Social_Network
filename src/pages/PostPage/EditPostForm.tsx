import React, { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Modal from "react-modal";
import { PostItem } from "../../store/API/postApi";
import {
  PostFormBox,
  PostFormContent,
  PostFormFooter,
  PostFormHeader,
} from "./PostForm.style";
import { Heading } from "../../components/Typography/Heading";
import { Input } from "../../components/UI/Input/Input";
import { Button } from "../../components/UI/Button/Button";
import { useEditPostMutation } from "../../store/API/postApi";
import { IEditPostPayload } from "../../store/API/postApi";
import * as yup from "yup";

type EditPostFormProps = {
  isOpen: boolean;
  onCloseModal: () => void;
  post: PostItem;
  onEditPostSuccess: () => void;
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const editNewPostSchema = yup.object({
  mainText: yup.string().required("Это обязательное поле"),
});

export const EditPostForm = ({
  isOpen,
  post,
  onCloseModal,
  onEditPostSuccess,
}: EditPostFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editNewPostSchema),
    defaultValues: {
      mainText: post.main_text
    }
  })

  const [editPost, { isLoading, isSuccess }] = useEditPostMutation()
  
  useEffect(() => {
    if (isSuccess) {
      onEditPostSuccess()
    }
  }, [isSuccess])

  const handleEditPostFormSubmit: SubmitHandler<{ mainText: string }> = (formData) => {
    const payload: IEditPostPayload = {
      post_id: post.id,
      new_text: formData.mainText
    }

    editPost(payload)
  }
  

  return (
    <Modal isOpen={isOpen} style={customStyles}>
      <PostFormBox onSubmit={handleSubmit(handleEditPostFormSubmit)}>
        <PostFormHeader>
          <Heading headingType="h3" headingText="Редактировать пост" />
        </PostFormHeader>
        <PostFormContent>
          <Controller
            name="mainText"
            control={control}
            render={({ field }) => (
              <Input
                isError={errors.mainText ? true : false}
                errorMessage={errors.mainText?.message}
                placeholder="Текст"
                {...field}
              />
            )}
          />
        </PostFormContent>
        <PostFormFooter>
          <Button
            disabled={isLoading}
            type="submit"
            buttonText="Сохранить"
            isPrimary
          />
          <Button disabled={isLoading} buttonText="Отменить" isPrimary onClick={onCloseModal} />
        </PostFormFooter>
      </PostFormBox>
    </Modal>
  );
};
