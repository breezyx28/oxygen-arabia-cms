const RoleChecker = (data) => {
  if (data?.data?.role !== 3) {
    alert('Only Users can login');
    return false;
  }

  return true;
};

export default RoleChecker;
