function isObjectId(str: any) {
    const objectIdPattern = /^[0-9a-fA-F]{24}$/;
    return objectIdPattern.test(str);
  }

  export default isObjectId