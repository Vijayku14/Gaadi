import { Stack } from "expo-router";
import React from "react";

const Rootlayout = () => {
  return (
   <Stack>
    <Stack.Screen name="index"/>
    <Stack.Screen name="OnboardingScreen"/>
   </Stack>
  );
};

export default Rootlayout;
