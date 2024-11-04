"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ChevronLeft, ChevronRight, BookOpen, Brain, Calculator, Award } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const allQuestions = [
  {
    id: 1,
    category: "Laplace Transforms",
    question: "Find the Laplace transform of f(t) = (√t + 1/√t)²",
    answer: "L{f(t)} = (π/s) + (2/s²)",
    steps: [
      "f(t) = (√t + 1/√t)² = t + 2 + 1/t",
      "L{t} = 1/s²",
      "L{2} = 2/s",
      "L{1/t} = ∫₀^∞ e^(-st) * (1/t) dt = π/s",
      "L{f(t)} = 1/s² + 2/s + π/s = (π/s) + (2/s²)"
    ],
    marks: 5,
    frequency: "Very High",
    priority: 5,
    difficulty: "Hard"
  },
  {
    id: 2,
    category: "Fourier Series",
    question: "Obtain the Fourier series expansion for f(x) = x² in (0, 2π)",
    answer: "f(x) = 4π²/3 - 4π/3 + Σ(4(-1)ⁿ/n² * cos(nx))",
    steps: [
      "a₀ = (1/π) ∫₀²ᵖ x² dx = 4π²/3",
      "aₙ = (1/π) ∫₀²ᵖ x² cos(nx) dx = 4(-1)ⁿ/n²",
      "bₙ = (1/π) ∫₀²ᵖ x² sin(nx) dx = 0",
      "f(x) = a₀/2 + Σ(aₙcos(nx) + bₙsin(nx))",
      "f(x) = 4π²/3 - 4π/3 + Σ(4(-1)ⁿ/n² * cos(nx))"
    ],
    marks: 8,
    frequency: "Very High",
    priority: 5,
    difficulty: "Hard"
  },
  {
    id: 3,
    category: "Probability and Statistics",
    question: "Calculate the mean and variance for the data: 2, 4, 4, 4, 5, 5, 7, 9",
    answer: "Mean = 5, Variance = 4",
    steps: [
      "Mean = (2 + 4 + 4 + 4 + 5 + 5 + 7 + 9) / 8 = 40 / 8 = 5",
      "Variance = Σ(x - mean)² / n",
      "(2-5)² + (4-5)² + (4-5)² + (4-5)² + (5-5)² + (5-5)² + (7-5)² + (9-5)²",
      "= 9 + 1 + 1 + 1 + 0 + 0 + 4 + 16 = 32",
      "Variance = 32 / 8 = 4"
    ],
    marks: 6,
    frequency: "High",
    priority: 4,
    difficulty: "Easy"
  },
  {
    id: 4,
    category: "Complex Analysis",
    question: "Find the real and imaginary parts of (1 + i)³",
    answer: "Real part: -2, Imaginary part: 2",
    steps: [
      "(1 + i)³ = (1 + i)(1 + i)(1 + i)",
      "= (1 + 2i - 1)(1 + i)",
      "= (2i)(1 + i)",
      "= 2i + 2i² = 2i - 2",
      "Real part: -2, Imaginary part: 2"
    ],
    marks: 6,
    frequency: "Moderate",
    priority: 3,
    difficulty: "Easy"
  },
  {
    id: 5,
    category: "Calculus",
    question: "Find the derivative of f(x) = x³ - 3x² + 2x - 1",
    answer: "f'(x) = 3x² - 6x + 2",
    steps: [
      "Use the power rule: d/dx(x^n) = nx^(n-1)",
      "d/dx(x³) = 3x²",
      "d/dx(-3x²) = -6x",
      "d/dx(2x) = 2",
      "d/dx(-1) = 0",
      "f'(x) = 3x² - 6x + 2"
    ],
    marks: 4,
    frequency: "Very High",
    priority: 5,
    difficulty: "Easy"
  }
]

export function EnhancedColorfulMathPractice() {
  const [revealedAnswers, setRevealedAnswers] = useState<number[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [showEasyOnly, setShowEasyOnly] = useState(false)
  const [progress, setProgress] = useState(0)

  const filteredQuestions = showEasyOnly
    ? allQuestions.filter(q => q.difficulty === "Easy")
    : allQuestions

  useEffect(() => {
    setProgress((revealedAnswers.length / filteredQuestions.length) * 100)
  }, [revealedAnswers, filteredQuestions])

  const toggleAnswer = (id: number) => {
    setRevealedAnswers(prev => 
      prev.includes(id) ? prev.filter(answerId => answerId !== id) : [...prev, id]
    )
  }

  const nextQuestion = () => {
    setCurrentQuestionIndex((prev) => (prev + 1) % filteredQuestions.length)
  }

  const prevQuestion = () => {
    setCurrentQuestionIndex((prev) => (prev - 1 + filteredQuestions.length) % filteredQuestions.length)
  }

  const currentQuestion = filteredQuestions[currentQuestionIndex]

  return (
    <div className="container mx-auto p-4 bg-gradient-to-br from-purple-100 to-pink-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-center text-purple-800">Engineering Mathematics Practice</h1>
      <div className="flex items-center justify-between mb-4">
        <Progress value={progress} className="w-2/3" />
        <div className="flex items-center space-x-2">
          <Switch
            id="easy-mode"
            checked={showEasyOnly}
            onCheckedChange={setShowEasyOnly}
          />
          <Label htmlFor="easy-mode">Easy Mode</Label>
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="mb-4 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <CardTitle className="flex items-center">
                <BookOpen className="mr-2" />
                {currentQuestion.category}
              </CardTitle>
              <CardDescription className="text-purple-100">
                Priority: {currentQuestion.priority} | Marks: {currentQuestion.marks} | Frequency: {currentQuestion.frequency}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-lg font-medium mb-4">{currentQuestion.question}</p>
              <Tabs defaultValue="question" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="question">Question</TabsTrigger>
                  <TabsTrigger value="solution">Solution</TabsTrigger>
                </TabsList>
                <TabsContent value="question">
                  <p className="text-purple-700">Try to solve this question on your own before checking the solution!</p>
                </TabsContent>
                <TabsContent value="solution">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="answer">
                      <AccordionTrigger>
                        <div className="flex items-center">
                          <Calculator className="mr-2" />
                          Answer
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        {revealedAnswers.includes(currentQuestion.id) ? (
                          <div className="text-green-600 font-semibold">{currentQuestion.answer}</div>
                        ) : (
                          "Click 'Reveal Answer' to see the solution."
                        )}
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="steps">
                      <AccordionTrigger>
                        <div className="flex items-center">
                          <Brain className="mr-2" />
                          Step-by-Step Solution
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        {revealedAnswers.includes(currentQuestion.id) ? (
                          <ol className="list-decimal list-inside space-y-2">
                            {currentQuestion.steps.map((step, index) => (
                              <motion.li
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="text-purple-700"
                              >
                                {step}
                              </motion.li>
                            ))}
                          </ol>
                        ) : (
                          "Click 'Reveal Answer' to see the step-by-step solution."
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between bg-purple-50">
              <Button
                onClick={() => toggleAnswer(currentQuestion.id)}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {revealedAnswers.includes(currentQuestion.id) ? "Hide Answer" : "Reveal Answer"}
              </Button>
              <Badge variant="outline" className="bg-pink-100 text-pink-800">
                <Award className="mr-1" />
                {`Priority ${currentQuestion.priority}`}
              </Badge>
            </CardFooter>
          </Card>
        </motion.div>
      </AnimatePresence>
      <div className="flex justify-between">
        <Button onClick={prevQuestion} className="bg-pink-500 hover:bg-pink-600">
          <ChevronLeft className="mr-2" /> Previous
        </Button>
        <Button onClick={nextQuestion} className="bg-pink-500 hover:bg-pink-600">
          Next <ChevronRight className="ml-2" />
        </Button>
      </div>
    </div>
  )
}