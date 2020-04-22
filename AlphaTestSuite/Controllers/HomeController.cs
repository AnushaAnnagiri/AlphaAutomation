using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Mvc;
using Alpha;
using Alpha.TestSteps;
using AlphaUtilities;
using AlphaUtilities.CustomAttributes;
using NUnit.Framework;
using NUnitLite;

namespace AlphaTestSuite.Controllers
{
    public class HomeController : Controller
    {
        static List<string> TestNames = new List<string>();  

        public ActionResult Index()
        {
            var testNames = GetAllTestNames();
            return View(testNames);
        }

        public List<string> GetAllTestNames()
        {
            FindAttributes();
            return TestNames;
        }

        public ActionResult RunAllTests()
        {
            foreach(var testName in TestNames)
            {
                var assemblyName = Assembly.GetAssembly(typeof(Login));

                var autorun = new AutoRun(assemblyName);

                var result = autorun.Execute(new String[] { "/test:Alpha.SampleTest."+ testName });
            }
             
            return View("TestResult");
        }
        
        private static void FindAttributes()
        {
            var assembly = Assembly.GetAssembly(typeof(Login));
            var types = assembly.GetTypes();
            var inputParameterList = new List<string>();
            foreach (var t in types)
            {
                var typeAttr = t.GetCustomAttribute(typeof(TestFixtureAttribute));
                if (typeAttr != null)
                {                   
                }

                var methods = t.GetMethods();
                foreach (var m in methods)
                {
                    var methodAttr = m.GetCustomAttribute(typeof(TestAttribute));
                    if (methodAttr != null)
                    {
                        TestNames.Add(m.Name);
                    }

                    var inputAttr = m.GetCustomAttribute(typeof(TestInputAttribute));
                    if (inputAttr != null)
                    {
                        inputParameterList.Add(m.Name);
                    }
                }
            }
        }

    }
}