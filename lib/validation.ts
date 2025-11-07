export interface ComplaintValidation {
  isValid: boolean;
  errors: string[];
}

export const validateComplaint = ({
  issueType,
  title,
  description,
  email,
  mobile,
  photos,
}: {
  issueType: string;
  title: string;
  description: string;
  email?: string;
  mobile?: string;
  photos?: File[];
}): ComplaintValidation => {
  const errors: string[] = [];

  // Required fields
  if (!issueType) errors.push('Issue type is required');
  if (!title.trim()) errors.push('Title is required');
  if (!description.trim()) errors.push('Description is required');
  
  // Title length
  if (title.length < 5) errors.push('Title must be at least 5 characters');
  if (title.length > 100) errors.push('Title must be less than 100 characters');
  
  // Description length
  if (description.length < 20) errors.push('Description must be at least 20 characters');
  if (description.length > 1000) errors.push('Description must be less than 1000 characters');
  
  // Email format
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('Invalid email format');
  }
  
  // Mobile format (assuming Indian numbers)
  if (mobile && !/^[6-9]\d{9}$/.test(mobile)) {
    errors.push('Invalid mobile number format');
  }
  
  // Photos validation
  if (photos) {
    if (photos.length > 5) {
      errors.push('Maximum 5 photos allowed');
    }
    
    const invalidPhoto = photos.find(photo => photo.size > 10 * 1024 * 1024);
    if (invalidPhoto) {
      errors.push('Each photo must be less than 10MB');
    }
    
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const invalidType = photos.find(photo => !allowedTypes.includes(photo.type));
    if (invalidType) {
      errors.push('Only JPEG, PNG and WebP images are allowed');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};