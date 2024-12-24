namespace ZurnaciApi.Handler
{
    public class FoodImageUploadHandler
    {
        public static async Task<string> UploadImageAsync(IFormFile imageFile)
        {
            List<string> permittedExtensions = new List<string> { ".jpg", ".jpeg", ".png" };
            string extension = Path.GetExtension(imageFile.FileName);
            if(!permittedExtensions.Contains(extension))
            {
                return $"File extension {extension} is not permitted. Permitted {string.Join(',', permittedExtensions)}";
            }

            long size = imageFile.Length;
            if (size > (10 * 1024 * 1024))
            {
                return "File size is greater than 1MB";
            }

            string timestamp = DateTime.Now.ToString("yyyyMMdd_HHmmss");
            string fileName = $"{Guid.NewGuid()}_{timestamp}{extension}";
            string filePath = Path.Combine(Directory.GetCurrentDirectory(), "Uploads", "Foods");

            if (!Directory.Exists(filePath))
            {
                Directory.CreateDirectory(filePath);
            }

            string fullPath = Path.Combine(filePath, fileName);
            using (FileStream stream = new FileStream(fullPath, FileMode.Create))
            {
                await imageFile.CopyToAsync(stream);
            }

            return fileName;

        }
    }
}
