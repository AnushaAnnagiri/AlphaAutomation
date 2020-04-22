using AventStack.ExtentReports;

namespace TestAutomationFramework.Utilities.ExtentReport
{
    public class ReportManager
    {
        static ReportManager() { }
        private ReportManager() { }

        public static ExtentReports GetInstance { get; } = new ExtentReports();
    }
}
