import React, { Fragment, useState } from "react";
import { useCookies } from "react-cookie";
import { useToken, useWindowWidth } from "../utils/hooks";
import { Image, Form, Button, Modal, Message } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { USER_EDIT_PROFILE_PICTURE, USER_ME } from "../graphqls";

const EditPictureForm = () => {
  const data = useToken();
  const [cookies] = useCookies();
  const [open, setOpen] = useState(false);
  const windowWidth = useWindowWidth();
  const [values, setValues] = useState(null);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState(null);
  const [editPicture, { loading }] = useMutation(USER_EDIT_PROFILE_PICTURE, {
    context: {
      headers: {
        Authorization: cookies.access_token
          ? `Bearer ${cookies.access_token}`
          : "",
      },
    },
    variables: {
      avatar: values?.avatar ? values.avatar : null,
    },
    onError(err) {
      console.log(err);
    },
    update(cache, result) {
      const data = cache.readQuery({
        query: USER_ME,
      });
      cache.writeQuery({
        query: USER_ME,
        data: {
          me: {
            ...data.me,
            avatar: result.data.user.edit_avatar,
          },
        },
      });
    },
  });

  const onChange = (e) => {
    setErrors(null);
    const { type } = e?.target?.files[0];
    if (
      e?.target?.files[0] &&
      !(type == "image/png" || type == "image/jpeg" || type == "image/jpg")
    ) {
      setErrors("File Extensions Must Be .png .jpg .jpeg");
      return;
    }
    setValues({ avatar: e.target.files[0] });
    setPreview({
      file: URL.createObjectURL(e.target.files[0]),
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    editPicture();
  };

  return (
    <Fragment>
      <Button
        circular
        size="mini"
        icon={
          <Image
            centered
            circular
            // bordered
            size="mini"
            src="https://www.pngitem.com/pimgs/m/24-248275_transparent-editing-png-images-edit-profile-icon-png.png"
          />
        }
        onClick={() => setOpen(true)}
        style={
          windowWidth >= 768
            ? {
                borderWidth: "2px",
                position: "absolute",
                bottom: "0",
                right: "0",
              }
            : {
                position: "relative",
                top: "30px",
                right: "30px",
                width: "30px",
              }
        }
      />
      <Modal
        onClose={() => {
          setOpen(false);
          setErrors(null);
        }}
        onOpen={() => setOpen(true)}
        open={open}>
        <Modal.Header>Choose A Photo</Modal.Header>
        <Modal.Content image>
          <Image
            centered
            size="medium"
            src={
              preview?.file
                ? preview.file
                : values?.avatar
                ? values.avatar
                : data?.me.avatar
                ? data.me.avatar
                : process.env.REACT_APP_DEFAULT_IMAGE
            }
            wrapped
          />
        </Modal.Content>
        <Modal.Actions>
          <Form onSubmit={onSubmit} className={loading ? "loading" : ""}>
            <Form.Input
              label="Image"
              name="avatar"
              onChange={onChange}
              type="file"
            />
            <Button type="submit" primary disabled={errors ? true : false}>
              Submit
            </Button>
            {errors && (
              <Message negative style={{ textAlign: "center" }}>
                <Message.Header>{errors}</Message.Header>
              </Message>
            )}
          </Form>
        </Modal.Actions>
      </Modal>
    </Fragment>
  );
};

export default EditPictureForm;
