const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const validateDateOfBirth = (value: string) => {
  const dob = new Date(value);
  const ageDiffMs = Date.now() - dob.getTime();
  const ageDate = new Date(ageDiffMs);
  const age = Math.abs(ageDate.getUTCFullYear() - 1970);

  if (age < 18) {
    return "You must be at least 18 years old";
  }
};

const removeToken = () => {
  typeof window !== "undefined" &&
    window.localStorage.removeItem("access_token");
  typeof window !== "undefined" &&
    window.localStorage.removeItem("refresh_token");
};

const clearLocalStorage = () => {
  typeof window !== "undefined" && window.localStorage.clear();
};

function getRelativeTime(dateTimeString: string): string {
  const now = new Date();
  const dateTime = new Date(dateTimeString);
  const diffInSeconds = Math.floor((now.getTime() - dateTime.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} sec ago`;
  } else if (diffInSeconds < 3600) {
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    return `${diffInMinutes} min ago`;
  } else if (diffInSeconds < 86400) {
    const diffInHours = Math.floor(diffInSeconds / 3600);
    return `${diffInHours} hours ago`;
  } else if (diffInSeconds < 2592000) {
    const diffInDays = Math.floor(diffInSeconds / 86400);
    return `${diffInDays} days ago`;
  } else if (diffInSeconds < 31536000) {
    const diffInMonths = Math.floor(diffInSeconds / 2592000);
    return `${diffInMonths} months ago`;
  } else {
    const diffInYears = Math.floor(diffInSeconds / 31536000);
    return `${diffInYears} years ago`;
  }
}

function intlFormat(num: number) {
  return new Intl.NumberFormat().format(Math.round(num * 10) / 10);
}
function makeFriendly(num: number) {
  if (num >= 1000000) return intlFormat(num / 1000000) + "M";
  if (num >= 1000) return intlFormat(num / 1000) + "k";
  return intlFormat(num);
}

const getInitials = (firstName: string, lastName: string) => {
  return String(
    firstName.toUpperCase().charAt(0) + lastName.toUpperCase().charAt(0)
  );
};

export {
  passwordPattern,
  emailPattern,
  validateDateOfBirth,
  removeToken,
  getRelativeTime,
  intlFormat,
  makeFriendly,
  clearLocalStorage,
  getInitials,
};
