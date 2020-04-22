using AventStack.ExtentReports;
using AventStack.ExtentReports.Reporter;
using AventStack.ExtentReports.Reporter.Configuration;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AlphaUtilities.ExtentReport
{
    public class ReportingTask
    {
        private ExtentReports _extent;
        private ExtentTest _test;
        private static ExtentHtmlReporter htmlReporter;

        /// <summary>
        /// Initializes a new instance of the <see cref="ReportingTask"/> class.
        /// </summary>
        /// <param name="extentInstance">The extent instance.</param>
        public ReportingTask(ExtentReports extentInstance)
        {
            _extent = extentInstance;
        }

        /// <summary>
        /// Starts reporting.
        /// Runs before the tests gets executed
        /// </summary>
        public void SetupReporting()
        {
            htmlReporter = new ExtentHtmlReporter(@"E:\AlphaAutomation\AlphaTestSuite\AlphaTestReport\report.html");

            htmlReporter.Config.Theme = Theme.Standard;

            htmlReporter.Config.DocumentTitle = "Alpha Automation";

            htmlReporter.Config.ReportName = "Alpha Automation Report";

            htmlReporter.Config.JS = "$('.brand-logo').text('').append('<img src=D:\\Users\\jloyzaga\\Documents\\FrameworkForJoe\\FrameworkForJoe\\Capgemini_logo_high_res-smaller-2.jpg>')";

            _extent.AddSystemInfo("Browser", "Chrome"); // hardcoded

            _extent.AttachReporter(htmlReporter);
        }

        /// <summary>
        /// Initializes the test for reporting.
        /// Runs at the beginning of every test
        /// </summary>
        public void InitializeTest()
        {
            _test = _extent.CreateTest(TestContext.CurrentContext.Test.Name);
        }

        /// <summary>
        /// Finalizes the test.
        /// Runs at the end of every test
        /// </summary>
        public void FinalizeTest()
        {
            var status = TestContext.CurrentContext.Result.Outcome.Status;
            var stacktrace = string.IsNullOrEmpty(TestContext.CurrentContext.Result.StackTrace)
                ? ""
                : string.Format("<pre>{0}</pre>", TestContext.CurrentContext.Result.Message);
            Status logstatus;

            switch (status)
            {
                case NUnit.Framework.Interfaces.TestStatus.Failed:
                    logstatus = Status.Fail;
                    break;
                case NUnit.Framework.Interfaces.TestStatus.Inconclusive:
                    logstatus = Status.Warning;
                    break;
                case NUnit.Framework.Interfaces.TestStatus.Skipped:
                    logstatus = Status.Skip;
                    break;
                default:
                    logstatus = Status.Pass;
                    break;
            }

            _test.Log(logstatus, "Test has " + status + stacktrace);     
        }

        /// <summary>
        /// Cleans up reporting.
        /// Runs after all the test finishes
        /// </summary>
        public void CleanUpReporting()
        {
            _extent.Flush();
        }

    }
}
