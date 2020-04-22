using AventStack.ExtentReports;

namespace AlphaUtilities.ExtentReport
{
    public class ReportManager
    {
        static ReportManager() { }
        private ReportManager() { }

        public static ExtentReports GetInstance { get; } = new ExtentReports();
    }
}
