-- La categoria "pizza" deve contenere pizze (pronte, surgelate, basi), non
-- prodotti "al gusto pizza" o ingredienti "per pizza". Verificato sul catalogo
-- live il 18 Nov 2026: 19 prodotti spostati nella categoria corretta.
-- Filtro su category = 'pizza' così la migration è idempotente e non tocca
-- prodotti già ricategorizzati a mano da Mission Control.

-- Snack / crackers / salatini al gusto pizza → snack
UPDATE public.products SET category = 'snack', updated_at = now()
WHERE category = 'pizza' AND id IN (
  'f4aef051-e181-4f7d-8ce4-7a29530773a6', -- Tockèt Pizza Le Veneziane 100g
  '820dd84b-be93-41d0-b88b-c775ef3b245a', -- Tockèt Pizza multipack Le Veneziane
  'd1e21085-fd73-4c41-aa42-08033dd61bc3', -- Tockèt alla pizza Le Veneziane
  '3313aa9c-69f0-46c1-a9a7-cc6fd9033fc8', -- Snack pizza NutriFree
  '4a9dcdbc-5bda-41a5-8368-0b21053dad60', -- Spikkiò snack pizza Madrigali
  '5d69b417-5944-4c42-b1af-58c3c094b80d', -- Stixi pizza snack Giusto
  '3f925a67-a9f6-49a2-9612-0a865ead0e8c', -- Giusto Stixi Pizza 60 g
  '5b5017e3-bb9c-4ffe-a690-074ede84dc2d', -- Giusto Stixi Pizza snack salato 60 g
  'a2629132-8eef-48fc-9ec7-0a0b862d278a', -- Crackers pizza Happy Farm
  '63a3e9f9-cc24-423a-873e-298a8d7d893d'  -- Snack di legumi pizzaiola Gusto Benessere
);

-- Lieviti, farine e preparati per pizza → farina
UPDATE public.products SET category = 'farina', updated_at = now()
WHERE category = 'pizza' AND id IN (
  '74b327b0-d271-444f-92e0-8e34a738eb16', -- Lievito Colombo per pizza e salati
  '942b72fa-b7a3-4b88-8375-3c72e0f7426b', -- Lievito istantaneo pizze e salati Colombo
  'dd538f2c-3752-4456-973f-d17ae3e19350', -- Farina di riso integrale "ideale per pizza"
  '4c8e5972-859b-4be6-8adc-5b41cb56cdc1'  -- Pizza Catarì a lievitazione istantanea (preparato)
);

-- Pane al gusto pizza → pane
UPDATE public.products SET category = 'pane', updated_at = now()
WHERE category = 'pizza' AND id = 'a29b179c-ebfe-439f-8383-43cae7d7447d'; -- Pan Bruschetta Pizza NutriFree

-- Né pizza né altra categoria → altro
UPDATE public.products SET category = 'altro', updated_at = now()
WHERE category = 'pizza' AND id IN (
  'c900df7b-91d5-4fb5-b3c4-e3364be9dc28', -- PizzAut ristorante (non è un prodotto)
  '87424d43-db57-4fc8-8c28-3bf1080300f7', -- Capri mozzarella vegetale per pizza
  '36145ad0-282c-4db0-bc23-f4727d5ff55d', -- Violife grattugiato per pizza
  '2fbb1449-4a03-4e5a-91d3-ecfc03a8ff93'  -- Pizzicotti Sg Sas
);
