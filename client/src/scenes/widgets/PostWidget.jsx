import {
  ChatBubbleOutlineOutlined,
  DeleteOutlineOutlined,
  EditOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  console.log(loggedInUserId);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const deletePost = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/posts/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        console.log("Post deleted successfully");
      } else {
        console.log("Failed to delete post");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  const updatePost = async (postId, updatedData) => {
    console.log(updatedData);
    try {
      const response = await fetch(`http://localhost:3001/posts/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      if (response.ok) {
        console.log("Post updated successfully");
        return true; // Indicate successful update
      } else {
        console.log("Failed to update post");
        return false; // Indicate failed update
      }
    } catch (error) {
      console.error("Error:", error);
      return false; // Indicate failed update
    }
  };

  // Inside the component
  const [updatedDescription, setUpdatedDescription] = useState(description);
  const [updatedLocation, setUpdatedLocation] = useState(location);

  const handleSave = async () => {
    const success = await updatePost(postId, {
      description: updatedDescription,
      location: updatedLocation,
    });
    if (success) {
      // Update the local state or dispatch an action to update the post
      console.log("Update successful");
    } else {
      console.log("Update failed");
    }
    handleClose();
  };  

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:3001/assets/${picturePath}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        {loggedInUserId === postUserId && (
          <FlexBetween gap="0.1rem">
            <IconButton onClick={handleClickOpen}>
              <EditOutlined />
            </IconButton>
            <IconButton onClick={() => deletePost(postId)}>
              <DeleteOutlineOutlined color="error"/>
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>
      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Edit Post"}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="description"
            id="description"
            margin="normal"
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
          />
          <TextField
            fullWidth
            label="location"
            id="location"
            margin="normal"
            value={updatedLocation}
            onChange={(e) => setUpdatedLocation(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </WidgetWrapper>
  );
};

export default PostWidget;
