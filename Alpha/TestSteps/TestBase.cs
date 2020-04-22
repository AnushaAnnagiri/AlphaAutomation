using System;
using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using System.IO;
using AventStack.ExtentReports;
using AventStack.ExtentReports.Reporter;
using AventStack.ExtentReports.Reporter.Configuration;
using TestAutomationFramework.Utilities.ExtentReport;

namespace TestAutomationFramework.Tests.TestSteps
{   
    [TestFixture]
    public abstract class TestBase
    {
        internal static IWebDriver driver;
        private static ReportingTask _reportingTasks;        
        private static ExtentReports extent;

        [OneTimeSetUp]
        public void Start()
        {
            extent = ReportManager.GetInstance;
            if (_reportingTasks == null)
            {
                _reportingTasks = new ReportingTask(extent);
                _reportingTasks.SetupReporting();                
            }
            if (driver == null)
            {
                driver = new ChromeDriver("E:\\AlphaAutomation\\AlphaTestSuite\\AlphaTestReport");
                driver.Manage().Window.Maximize();                
            }                    
        }               

        [SetUp]
        public void TestSetup()
        {
            _reportingTasks.InitializeTest();
        }

        [TearDown]
        public void TestCleanup()
        {
            _reportingTasks.FinalizeTest();
            driver.Manage().Cookies.DeleteAllCookies();
        }


        // This should be called at the end of Workflow Execution
        //[OneTimeTearDown]
        //public void GenerateReport()
        //{
        //    if (driver != null)
        //    {
        //        driver.Quit();
        //    }
        //    _reportingTasks.CleanUpReporting();
        //}       
        
    }
}

