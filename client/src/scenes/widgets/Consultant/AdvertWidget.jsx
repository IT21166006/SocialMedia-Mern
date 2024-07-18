import { Button, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import jsPDF from 'jspdf';

const AdvertWidget = ({ userId }) => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;

  const generatePDF = () => {
    if (!user) return;

    const doc = new jsPDF();
    doc.text(`Name: ${user.firstName} ${user.lastName}`, 10, 10);
    doc.text(`Location: ${user.location}`, 10, 20);
    doc.text(`Occupation: ${user.occupation}`, 10, 30);
    doc.save(`${user.firstName}_${user.lastName}_Resume.pdf`);
  };

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) {
    return null;
  }

  return (
    <WidgetWrapper position={"fixed"} top={"100px"} width={"20%"}>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Name: {user.firstName} {user.lastName}
        </Typography>
        <Typography color={medium}>Resume</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        About: {user.occupation}
      </Typography>
      <Typography color={medium} m="0.5rem 0">
        Location: {user.location}
      </Typography>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
        </Typography>
        <Button onClick={generatePDF}>Print</Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
