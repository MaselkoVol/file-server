function checkIfPathnamesAreRedundant(
  pathname1: string[],
  pathname2: string[],
) {
  const minLength = Math.min(pathname1.length, pathname2.length);
  const path1Str = pathname1.slice(0, minLength).join("/");
  const path2Str = pathname2.slice(0, minLength).join("/");
  return path1Str === path2Str;
}

function replacePathnameIfRedundant(
  pathname: string[],
  filteredPathnamesAsParts: string[][],
) {
  let isRedundant = false;

  for (let i = 0; i < filteredPathnamesAsParts.length; i++) {
    const currentPath = filteredPathnamesAsParts[i];
    if (!currentPath) continue;

    if (checkIfPathnamesAreRedundant(currentPath, pathname)) {
      if (currentPath.length > pathname.length) {
        filteredPathnamesAsParts[i] = pathname;
      }
      isRedundant = true;
      break;
    }
  }
  return isRedundant;
}

export default function removeRedundantPathnames(
  pathnames: string[],
): string[] {
  const filteredPathnamesAsParts: string[][] = [];
  const pathnamesAsParts = pathnames.map((pathname) => pathname.split("/"));

  for (const pathname of pathnamesAsParts) {
    const isDuplication = replacePathnameIfRedundant(
      pathname,
      filteredPathnamesAsParts,
    );

    if (!isDuplication) {
      filteredPathnamesAsParts.push(pathname);
    }
  }
  const filteredPathnames = filteredPathnamesAsParts.map((splitedPath) =>
    splitedPath.join("/"),
  );
  return filteredPathnames;
}
