# Ops Advisor - 5 Minute Demo Script
## Re-imagining Amazon Devices Supply Chain using Ops Advisor

**Total Duration: 5 minutes**
**Use Case: Fire SMP Horizon Launch - Streaming Media Player 2026**

---

## SLIDE 1: Landing Page (0:00 - 0:30) | 30 seconds
**Screen:** `app/page.tsx` (Landing Page)

### Script:
"Welcome! Today I'll show you how Ops Advisor is reimagining supply chain operations for Amazon Devices. 

Ops Advisor is your 24x7 AI companion that acts on behalf of employees by leveraging various domain-specific agents to get work done. Think of it as having an expert team working around the clock—orchestrating PLM, supplier management, planning, logistics, quality, and returns.

We'll illustrate this through a real-world example: launching the Fire SMP Horizon, a next-generation streaming media player with 4K HDR streaming, WiFi 6, and Dolby Atmos for launch in August 2026. Let's see how AI agents transform months of manual work into days of strategic decisions."

**[Transition to Dashboard]**

---

## SLIDE 2: Role-Based Dashboard (0:30 - 1:15) | 45 seconds
**Screen:** `app/dashboard/page.tsx` (Main Dashboard)

### Script:
"Here's my personalized dashboard. Notice how Ops Advisor has been working on my behalf 24x7, scanning various data stores—PLM systems, costing tools, supplier databases, inventory systems—and identifying actions relevant to me.

See these action cards? Each represents a decision or task that AI agents have prepared for me. The red 'high' priority badges show critical items needing attention. The agents listed on each card—Quality Agent, Supplier Management Agent, Planning Agent—show which domain experts contributed.

For our Fire SMP Horizon launch, I need to understand how to plan the various milestones. Traditionally, this would take 2-3 months of manual coordination. With Ops Advisor, we work backwards from our August 2026 launch date, and agents handle the complex orchestration while I focus on strategic approvals.

Let me show you how different roles collaborate through AI."

**[Transition to Program Page]**

---

## SLIDE 3: Material Program Manager - Supplier Selection (1:15 - 2:00) | 45 seconds
**Screen:** `app/dashboard/program/page.tsx` → Click on Fire SMP Horizon Program → SPOR Tab

### Script:
"Let's switch to the Material Program Manager role. Early in any program, there's a critical supplier commodity selection decision to make—especially for streaming media devices like the Fire SMP Horizon, which requires complex components including display panels, WiFi 6 modules, and premium audio components.

Look here—the AI has already identified this action and suggested it. The Supplier Management Agent analyzed our historical data from similar Fire TV products, evaluated supplier performance, capacity, and regional capabilities.

Now I click into the program and navigate to the SPOR tab. I can click 'Recommend' and the AI generates supplier-commodity pairings. As the human-in-the-loop, I can review these AI-generated recommendations, modify them based on my expertise—perhaps I know about a recent quality issue or capacity constraint—and then finalize the decision.

Notice the overview section shows key program details: technology stack, product family, ASINs planned for different regions, and the $2.8M LTV. This is the power of agentic workflows: AI does the heavy lifting of analysis and recommendation, while I bring strategic judgment and context."

**[Transition to Cost Management]**

---

## SLIDE 4: GCM Role - Cost Negotiation (2:00 - 2:30) | 30 seconds
**Screen:** `app/dashboard/cost/quotes/page.tsx`

### Script:
"Now let's switch roles to a Global Commodity Manager negotiating costs.

Here, the AI has analyzed historical pricing data, market trends, and supplier quotes for Fire SMP Horizon components. It's provided should-cost analysis and flagged where we have negotiation leverage.

The system has automatically generated RFQ comparisons across multiple suppliers, highlighted cost reduction opportunities, and even suggested negotiation strategies based on past successful deals. I can approve these recommendations or adjust based on current market intelligence I'm hearing from suppliers."

**[Transition to Manufacturing/Capacity]**

---

## SLIDE 5: Manufacturing - Capacity Issues (2:30 - 3:00) | 30 seconds
**Screen:** `app/dashboard/supply-plan/page.tsx` or `app/dashboard/manufacturing/page.tsx`

### Script:
"Moving to products in production—here's where things get interesting. The Planning Agent has identified a capacity constraint for our Fire SMP Horizon launch timeline.

See this analysis? It's showing that our selected contract manufacturer has competing programs during our ramp period. The AI has already modeled three alternative scenarios: split production across two CMs, shift our timeline by 2 weeks, or secure premium capacity at 8% higher cost.

Each option shows impact to launch date, cost implications, and risk assessment. This kind of multi-variable analysis would typically require days of meetings. Now I have it instantly, allowing me to make informed decisions quickly."

**[Transition to Quality]**

---

## SLIDE 6: Quality Issues Detection (3:00 - 3:30) | 30 seconds
**Screen:** `app/dashboard/quality/supplier/page.tsx`

### Script:
"Now let's look at quality monitoring. The Quality Agent continuously analyzes defect data from similar products and suppliers.

Here's an alert: a recent shipment of IC chips from our current supplier showed a 3.2% defect rate—above our 1% threshold. The AI has automatically recommended pausing new purchase orders until root cause is identified.

Notice the supporting data: defect trends over time, comparison to other suppliers, and financial impact of both continuing and pausing. The agent even drafted the supplier communication. I just need to review and approve—ensuring human judgment on critical quality decisions."

**[Transition to Shipments/Logistics]**

---

## SLIDE 7: Logistics - Expedite Explainability (3:30 - 4:00) | 30 seconds
**Screen:** `app/dashboard/shipments/page.tsx` or `app/dashboard/fg-po/page.tsx`

### Script:
"Let's check logistics. The Logistics Agent manages our global distribution network.

Here's a powerful feature—expedite explainability. See this Fire SMP Horizon shipment? It's been flagged for expediting. But why? The AI shows me the complete chain of reasoning: a supplier delay upstream, coupled with a locked retail launch date, means we need to air freight instead of ocean freight.

The system has already calculated the expedite cost—$12,000—against the revenue risk of missing the launch window—$200,000 in lost sales. It's determined HSN codes for customs, identified potential tariff implications, and suggested optimal routing. The decision is clear, backed by data."

**[Transition back to Dashboard or Wrap-up View]**

---

## SLIDE 8: Distribution & Network Optimization (4:00 - 4:20) | 20 seconds
**Screen:** `app/dashboard/distribution/page.tsx`

### Script:
"The Logistics Agent also optimizes our distribution network. It's analyzing historical demand patterns by region, warehouse capacity, and transportation costs to recommend optimal inventory positioning.

For the Fire SMP Horizon launch, it's suggested pre-positioning inventory across multiple regions based on the ASIN distribution: 40% West Coast for North American markets, 35% in European distribution centers, and 25% in APAC. This reduces delivery time by 2 days and cuts distribution costs by 15%."

**[Transition to Closing]**

---

## SLIDE 9: Wrap-Up & Value Proposition (4:20 - 5:00) | 40 seconds
**Screen:** `app/dashboard/page.tsx` (Back to Main Dashboard)

### Script:
"So what have we seen today? Ops Advisor—your personal AI agent—working with an organization's multi-domain agents to get work done.

Instead of spending months in meetings coordinating across PLM, sourcing, planning, logistics, and quality, we now have AI agents working 24x7, analyzing data, identifying issues, generating recommendations, and preparing decisions. 

The human remains in the loop for strategic judgment, but the AI handles the complexity of multi-system coordination, data analysis, and scenario modeling.

The result? We've compressed a 3-month planning cycle into days. We've moved from reactive firefighting to proactive optimization. And we've freed our teams to focus on strategic decisions that truly require human expertise.

This is the future of supply chain operations—where AI agents augment human capability, not replace it. Thank you!"

**[END]**

---

## DEMO FLOW SUMMARY

| Time | Slide | Screen/Page | Key Message |
|------|-------|-------------|-------------|
| 0:00-0:30 | 1 | Landing Page | Introduction & Use Case Overview (Fire SMP Horizon) |
| 0:30-1:15 | 2 | Dashboard | 24x7 AI monitoring & action identification |
| 1:15-2:00 | 3 | Program → SPOR | Material selection with human-in-loop |
| 2:00-2:30 | 4 | Cost Quotes | Cost negotiation & should-cost analysis |
| 2:30-3:00 | 5 | Supply Plan/Manufacturing | Capacity constraints & scenario planning |
| 3:00-3:30 | 6 | Quality | Proactive quality issue detection |
| 3:30-4:00 | 7 | Shipments/FG-PO | Expedite decisions with explainability |
| 4:00-4:20 | 8 | Distribution | Network optimization for multi-region launch |
| 4:20-5:00 | 9 | Dashboard | Wrap-up & value proposition |

---

## DEMO TIPS

### Preparation:
- Have sample data loaded for "Fire SMP Horizon" program (PRG-008)
- Pre-stage action card for "Create Supplier Plan of Record for Fire SMP Horizon"
- Ensure quality alert shows 3.2% defect rate example
- Set up expedite shipment example with cost/benefit analysis
- Verify program overview shows: Technology, ASINs by region, and $2.8M LTV

### Pacing:
- Keep energy high—this is transformation, not incremental improvement
- Use pauses after key statistics (3 months → days, $12K vs $200K)
- Make eye contact when emphasizing human-in-the-loop
- Show confidence in navigating between screens

### Key Phrases to Emphasize:
- "24x7 on your behalf"
- "Human-in-the-loop for strategic decisions"
- "Multi-domain agent orchestration"
- "Months compressed into days"
- "Proactive vs reactive"

### Transitions:
- Use phrases like "Let me show you...", "Now let's switch to...", "Here's where it gets interesting..."
- Keep hand on keyboard/mouse for smooth screen transitions
- Narrate clicks: "I'm clicking into this recommendation..."

---

## AUDIENCE ADAPTATION

### For Technical Audience:
- Emphasize agentic architecture, MCP integration, data ontology
- Mention specific AI models and reasoning capabilities
- Dive deeper into how agents communicate and coordinate

### For Business Audience:
- Focus on ROI: time savings, cost reduction, risk mitigation
- Use concrete numbers: 2-3 months → 5 days, 15% cost savings
- Emphasize strategic vs tactical work reallocation

### For Supply Chain Professionals:
- Highlight domain-specific expertise in each agent
- Show understanding of real pain points (meetings, manual analysis)
- Demonstrate respect for human judgment and experience
