import { useMutation, useQueryClient } from "react-query";

import {
  createTaskgroup,
  deleteTaskgroup,
  submitTaskgroup,
  uploadFileTaskgroup,
} from "@app/api/rest";

export interface ITaskgroupMutateState {
  mutate: any;
  isLoading: boolean;
  error: any;
}

export const useCreateTaskgroupMutation = (
  onSuccess: (res: any) => void,
  onError: (err: Error | unknown) => void
): ITaskgroupMutateState => {
  const { isLoading, mutate, error } = useMutation(createTaskgroup, {
    onSuccess: (res) => {
      onSuccess(res);
    },
    onError: (err) => {
      onError(err);
    },
  });
  return {
    mutate,
    isLoading,
    error,
  };
};

export const useSubmitTaskgroupMutation = (
  onSuccess: (res: any) => void,
  onError: (err: Error | unknown) => void
): ITaskgroupMutateState => {
  const queryClient = useQueryClient();

  const { isLoading, mutate, error } = useMutation(submitTaskgroup, {
    onSuccess: (res) => {
      onSuccess(res);
      queryClient.invalidateQueries("tasks");
    },
    onError: (err) => {
      onError(err);
      queryClient.invalidateQueries("tasks");
    },
  });
  return {
    mutate,
    isLoading,
    error,
  };
};

export const useUploadFileTaskgroupMutation = (
  successCallback: (res: any) => void,
  errorCallback: (err: Error | null) => void
): ITaskgroupMutateState => {
  const { isLoading, mutate, error } = useMutation(uploadFileTaskgroup, {
    onSuccess: (res) => {
      successCallback && successCallback(res);
    },
    onError: (err: Error) => {
      errorCallback && errorCallback(error);
    },
  });
  return {
    mutate,
    isLoading,
    error,
  };
};

export const useDeleteTaskgroupMutation = (
  onError: (err: Error | unknown) => void
): ITaskgroupMutateState => {
  const queryClient = useQueryClient();

  const { isLoading, mutate, error } = useMutation(deleteTaskgroup, {
    onError: (err) => {
      onError(err);
      queryClient.invalidateQueries("tasks");
    },
  });
  return {
    mutate,
    isLoading,
    error,
  };
};