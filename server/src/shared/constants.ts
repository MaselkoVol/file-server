export const NAME_REGEX = /^[^<>:"/\\|?*\x00-\x1F]*$/;

export const PATH_REGEX =
  /^(?!.*(?:^|\/)(?:\.{1,2})(?:\/|$))(?!.*\/\/)[^<>:"\\|?*\x00-\x1F]*$/;
