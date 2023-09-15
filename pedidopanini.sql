select case when num='FWC0' THEN 'CERO 0' ELSE NUM END NUM,cant
from figu where tipo in ('ESC','FWC') ORDER BY CANT