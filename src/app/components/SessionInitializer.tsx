"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { fetchUserProfile } from "@/lib/features/userSlice";

const SessionInitializer = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (user === null) {
      // @ts-expect-error: dispatch may not know about thunk type
      dispatch(fetchUserProfile());
    }
  }, [user, dispatch]);

  return null;
};

export default SessionInitializer;
