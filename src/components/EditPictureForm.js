import React, { Fragment, useState } from "react";
import { useCookies } from "react-cookie";
import { useWindowWidth } from "../utils/hooks";
import { Image, Form, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { USER_EDIT_PROFILE_PICTURE, USER_ME } from "../graphqls";

const EditPictureForm = () => {
  const [cookies] = useCookies();
  const [open, setOpen] = useState(false);
  const windowWidth = useWindowWidth();
  const [values, setValues] = useState(null);
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
    setValues({ avatar: e.target.files[0] });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    editPicture();
  };

  return (
    <Fragment>
      <Image
        centered
        circular
        bordered
        style={
          windowWidth >= 768
            ? { position: "absolute", bottom: "0", right: "0" }
            : {
                position: "relative",
                top: "30px",
                right: "30px",
                width: "30px",
              }
        }
        size="mini"
        src="https://www.pngitem.com/pimgs/m/24-248275_transparent-editing-png-images-edit-profile-icon-png.png"
        onClick={() => setOpen(true)}
      />
      <Form onSubmit={onSubmit} className={loading ? "loading" : ""}>
        <Form.Input
          label="Image"
          name="avatar"
          onChange={onChange}
          type="file"
        />
        <Button type="submit" primary>
          Submit
        </Button>
      </Form>
    </Fragment>
  );
};

export default EditPictureForm;
