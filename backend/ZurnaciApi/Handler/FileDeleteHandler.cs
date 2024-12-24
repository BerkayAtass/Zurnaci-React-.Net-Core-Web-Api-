namespace ZurnaciApi.Handler;
using System.IO;

public class FileDeleteHandler
{
    public static bool DeleteFile(string filePath)
    {
        if (File.Exists(filePath))
        {
            try
            {
                File.Delete(filePath);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error deleting file: {ex.Message}");
                return false;
            }
        }
        return false;  
    }
}